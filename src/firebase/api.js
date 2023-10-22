import { db, storage } from "@/firebase";
import {
    collection,
    doc,
    setDoc,
    getDocs,
    getDoc,
    addDoc,
    orderBy,
    Timestamp,
    query,
    where,
    limit,
} from "firebase/firestore";
import {
    ref,
    uploadBytesResumable,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { get } from "jquery";

// default returns all listings in DB
async function getAllListings(maxReturned) {
    let listings = [];
    let q;
    if (typeof maxReturned == "number" && maxReturned >= 0) {
        q = query(collection(db, "listings"), limit(maxReturned));
    } else {
        q = query(collection(db, "listings"));
    }
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        listings.push({
            Id: doc.id,
            details: doc.data(),
        });

        // console.log(doc.id, " => ", doc.data());
    });
    return listings;
}

async function getListing(listingId) {
    const docRef = doc(db, "listings", listingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function getListingsByCategory(category) {
    const listingsRef = collection(db, "listings");
    const q = query(listingsRef, where("Category", "==", category));
    const querySnapshot = await getDocs(q);
    const listings = [];

    querySnapshot.forEach((doc) => {
        if (doc.exists()) {
            listings.push(doc.data());
        } else {
            console.log("No such document!");
        }
    });

    return listings;
}

async function getListingsByPrice(maxReturned, highToLow) {
    const listingsRef = collection(db, "listings");
    let q;
    if (!highToLow) {
        q = query(listingsRef, orderBy("Price"), limit(maxReturned));
    } else {
        q = query(listingsRef, orderBy("Price", "desc"), limit(maxReturned));
    }
    const querySnapshot = await getDocs(q);
    const listings = [];

    querySnapshot.forEach((doc) => {
        if (doc.exists()) {
            listings.push(doc.data());
        } else {
            console.log("No such document!");
        }
    });

    return listings;
}

async function getNearbyListings(userLocation, maxDistance) {
    const listings = []; // array to store nearby listings
    const earthRadius = 6371; // radius of the earth in km

    // loop through all listings in Firestore
    const res = await getAllListings();
    res.forEach((doc) => {
        const listing = doc.details;
        const listingLocation = listing.Location;

        // calculate distance between user location and listing location
        const lat1 = userLocation.latitude;
        const lon1 = userLocation.longitude;
        const lat2 = listingLocation.latitude;
        const lon2 = listingLocation.longitude;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;

        // if distance is within maxDistance, add listing to array
        if (distance <= maxDistance) {
            listings.push(listing);
        }
    });

    return listings;
}

async function addListingNoImage(
    expiry_date,
    location,
    category,
    perishable,
    listing_name,
    qty_available,
    price
) {
    // Add a new document in collection "listings"
    const docRef = await addDoc(collection(db, "listings"), {
        ExpiryDate: Timestamp.fromDate(expiry_date),
        Location: location,
        Category: category,
        Perishable: perishable,
        ListingName: listing_name,
        QtyAvailable: qty_available,
        Price: price,
    });
    console.log("Document written with ID: ", docRef.id);
}

async function deleteListings(category) {
    const q = query(
        collection(db, "listings"),
        where("Category", "==", category)
    );
    let counter = 0;
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map((doc) => {
        // doc.data() is never undefined for query doc snapshots
        counter++;
        return deleteDoc(doc.ref);
    });
    await Promise.all(deletePromises);
    console.log(counter + " documents deleted");
}

function checkUniqueUsername(username){

    // returns true if username is unique and false if otherwise
    const usernameRef = collection(db, "userInformation")

    const q = query(usernameRef, where("username", "==", username));
    
    const querySnapshot = getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
      
    // });

    console.log('length', querySnapshot.length)
    return (querySnapshot.length == 0)
}

function matchString(input, pattern) {
    // Escape special regex characters in the plain string
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    // Create a regex object with the escaped pattern
    const regex = new RegExp(escapedPattern);
  
    // Use the test() method to check if the input matches the pattern
    return regex.test(input);
}

function filterByDistance(foodArr, distance){
    var result = []


    for(var i=0;i<foodArr.length;i++) {
        var food = foodArr[i]
        if (food.distance <= distance){
            console.log('wothin range')
            result.push(food)
        }
    }

    // console.log(result)
    return result
}
function filterByName(foodArr, name){
    var result = []
    var query = name.toLowerCase()

    for(var i=0;i<foodArr.length;i++) {
        let itemName = foodArr[i].info.ListingName
        let itemNameArr = itemName.split(" ")

        var output = ""

        for(let word of itemNameArr){
            word = word.toLowerCase()
            output += word
        }

        // console.log()
        console.log('arr', itemNameArr, 'query', query)

        // if (itemNameArr.includes(query)){
        //     console.log('true')
        //     result.push(foodArr[i])
        // }
        if (matchString(output, name)){
            console.log('true')
            result.push(foodArr[i])
        }
    }

    console.log(result)
    return result
}

export {
    getAllListings,
    addListingNoImage,
    getListing,
    deleteListings,
    getListingsByCategory,
    getListingsByPrice,
    getNearbyListings,
    checkUniqueUsername,
    matchString,
    filterByDistance,
    filterByName
};

