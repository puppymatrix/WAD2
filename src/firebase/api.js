import { db } from "@/firebase";
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
    writeBatch,
} from "firebase/firestore";

import axios from 'axios'

// listing functions

// default returns all listings in DB
async function getAllListings(maxReturned = null) {
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

// not used
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

// User functions
async function getUser(userId, type = "all") {
    const docRef = doc(db, "userInformation", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        if (type == "all") {
            return docSnap.data();
        } else if (type == "listings") {
            return docSnap.data()["myListings"];
        } else if (type == "chopes") {
            return docSnap.data()["chopes"];
        }
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function getUsersWhoChopedCollectedListing(listingId) {
    const users = await getAllUsers();
    const usersWhoChoped = users.filter((user) => {
        return (
            user.details.chopes &&
            user.details.chopes.some((chope) => chope.listingId === listingId)
        );
    });
    const usersWhoCollected = users.filter((user) => {
        return (
            user.details.chopes &&
            user.details.chopes.some((chope) => chope.collected === true)
        );
    });

    return { usersWhoChoped, usersWhoCollected };
}

async function getAllUsers() {
    let users = [];
    const q = query(collection(db, "userInformation"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        users.push({
            Id: doc.id,
            details: doc.data(),
        });

        // console.log(doc.id, " => ", doc.data());
    });
    return users;
}

async function updateUser(uid, firstName, lastName, username, accountType) {
    const userData = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        accountType: accountType,
    };

    await setDoc(doc(db, "userInformation", uid), userData, {merge: true});
    console.log("User updated successfully");
}

async function chopeListing(userId, listingId) {
    const user = await getUser(userId);
    if (user != null) {
        if (user.hasOwnProperty("chopes")) {
            user.chopes.push({
                listingId: listingId,
                collected: false,
                timestamp: Timestamp.now(),
            });
        } else {
            user.chopes = [
                {
                    listingId: listingId,
                    collected: false,
                    timestamp: Timestamp.now(),
                },
            ];
        }
        const userRef = doc(db, "userInformation", userId);
        await setDoc(userRef, user);
        console.log("Choped listing successfully");
    } else {
        console.log("No such document!");
    }
}

async function collectListing(userId, listingId) {
    const user = await getUser(userId);
    if (user != null) {
        if (user.hasOwnProperty("chopes")) {
            const index = user.chopes.findIndex(
                (chope) => chope.listingId == listingId
            );
            if (index != -1) {
                user.chopes[index].collected = true;
                const userRef = doc(db, "userInformation", userId);
                await setDoc(userRef, user);
                console.log("Collected successfully");
            } else {
                console.log("No such document!");
            }
        } else {
            console.log("No such document!");
        }
    } else {
        console.log("No such document!");
    }
}

async function deleteExpiredChopes() {
    try {
        const now = Timestamp.now(); // Make sure Timestamp is correctly defined
        const usersRef = collection(db, "userInformation");
        const usersSnapshot = await getDocs(usersRef);

        const batch = writeBatch(db);
        let hasChanges = false;

        // usersSnapshot.forEach(async (userData) => {
        for (const userData of usersSnapshot.docs) {
            const user = userData.data();
            const userRef = userData.ref;

            if (user.hasOwnProperty("chopes")) {
                const chopes = user.chopes;
                const chopesToUpdate = []; // Initialize an array to track chopes to be updated

                for (let i = 0; i < chopes.length; i++) {
                    const chope = chopes[i];

                    if (!chope.hasOwnProperty("timestamp")) {
                        continue;
                    }
                    const chopeAge =
                        now.toMillis() - chope.timestamp.toMillis();

                    if (!chope.collected) {
                        const listingRef = doc(db, "listings", chope.listingId);
                        const listingDoc = await getDoc(listingRef);
                        const perishable =
                            listingDoc.data().Perishable || false;

                        if (
                            (perishable && chopeAge > 12 * 60 * 60 * 1000) ||
                            (!perishable && chopeAge > 48 * 60 * 60 * 1000)
                        ) {
                            // Add chopes that should be removed to the chopesToUpdate array
                            chopesToUpdate.push(i);
                            console.log(chope.listingId + " expired");
                        }
                    }
                }

                if (chopesToUpdate.length > 0) {
                    // Remove the expired chopes from the user's chopes array
                    chopesToUpdate.forEach((index) => {
                        chopes.splice(index, 1);
                    });
                    batch.update(userRef, user);
                    hasChanges = true;
                    console.log("Expired chopes removed from user with ID: " + userRef.id);
                }
            }
        };

        // Check if there are chopes to update before committing the batch
        if (hasChanges) {
            await batch.commit();
            console.log("Expired chopes successfully deleted!");
        } else {
            console.log("No chopes to update.");
        }
    } catch (e) {
        console.error("An error occurred: ", e);
    }
}


function checkUniqueUsername(username){

    // returns true if username is unique and false if otherwise
    const usernameRef = collection(db, "userInformation")

    const q = query(usernameRef, where("username", "==", username));
    
    const querySnapshot = getDocs(q);
   
    // console.log('length', querySnapshot.length)
    return (querySnapshot.length == 0)
}

function filterByDistance(foodArr, filterDistance){
                var result = []

                for(var i=0;i<foodArr.length;i++) {
                    var food = foodArr[i]
                    if (food.distance <= filterDistance){
                        // console.log('wothin range')
                        result.push(food)
                    }
                }

                console.log(result)
                return result
            }

function filterByName(foodArr, name){
    var result = []
    var query = name.toLowerCase()

    for(var i=0;i<foodArr.length;i++) {
        if (i == 0){
            console.log(foodArr[i])
        }
        let itemName = foodArr[i].info.details.ListingName
        let itemNameArr = itemName.split(" ")

        var output = ""

        for(let word of itemNameArr){
            word = word.toLowerCase()
            output += word
        }

        // console.log()
        console.log('arr', itemNameArr, 'query', query)

        if (matchString(output, name)){
            console.log('true')
            result.push(foodArr[i])
        }
    }

    // console.log(result)
    return result
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const EARTHRADIUS = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude from degrees to radians
    const radLat1 = (Math.PI * lat1) / 180;
    const radLon1 = (Math.PI * lon1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const radLon2 = (Math.PI * lon2) / 180;

    // Haversine formula
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    // Calculate the distance
    const distance = EARTHRADIUS * c; // Result in kilometers

    return distance;

}

function matchString(input, pattern) {
    // Escape special regex characters in the plain string
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    // Create a regex object with the escaped pattern
    const regex = new RegExp(escapedPattern);
    // Use the test() method to check if the input matches the pattern
    return regex.test(input);
}

async function getAllCategories(){
    var result = []
    const querySnapshot = await getDocs(collection(db, "categories"));
    
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        result.push(doc.data())
      });

    return result
}

async function getCoordinates() {
    // this function gets the coordinates
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.key}&address=${this.searchQuery}`;

    console.log(url)

    axios.get(url)
    .then(
        response => {
            // console.log(response)

            const data = response.data.results[0];
            var latitude = parseFloat(data.geometry.location.lat)
            var longitude = parseFloat(data.geometry.location.lng)

            this.coord = {lat: latitude, lng: longitude}
        })
    .catch(
        error => {
            console.log(error)
            console.log(error.response.data.error_message)

    })
}

async function getUserLocation(){
    const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${this.key}`
    axios.post(url)
    .then(
        response => {
            // console.log('location', response)
            const data = response.data

            // console.log('userLocation', data.location)
            this.userLocation = data.location
        }   
    )

    .catch(
        error => {
            console.log(error)
        }
    )
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
    filterByName,
    getUser,
    getUsersWhoChopedCollectedListing,
    chopeListing,
    collectListing,
    deleteExpiredChopes,
    calculateDistance,
    getAllCategories,
    getUserLocation,
    getCoordinates,
    updateUser

};

