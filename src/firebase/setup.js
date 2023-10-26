import { db, storage } from "@/firebase";

import {
    collection,
    getDocs,
    addDoc,
    Timestamp,
    query,
    where,
    deleteDoc,
    setDoc,
    doc,
} from "firebase/firestore";

import { ref, getDownloadURL } from "firebase/storage";

import { getAllListings, getUser } from "@/firebase/api";

import Chance from "chance";

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

async function addRandomListing(category, maxNumImages) {
    // Randomly choose number of images to upload (1-3)
    const numImages = Math.floor(Math.random() * 3) + 1;

    // Upload images to Firebase Storage and get download URLs
    const imageUrls = await Promise.all(
        Array.from({ length: numImages }, async () => {
            const randomImageNumber =
                Math.floor(Math.random() * maxNumImages) + 1;
            const imagePath = `${category}/image${randomImageNumber}.jpeg`;
            const imageRef = ref(storage, imagePath);
            const downloadUrl = await getDownloadURL(imageRef);
            return downloadUrl;
        })
    );

    // Add a new document in collection "listings"
    const docRef = await addDoc(collection(db, "listings"), {
        ExpiryDate: Timestamp.fromDate(getRandomExpiryDate()),
        Location: getRandomLocation(),
        Category: category,
        Perishable: getRandomPerishable(),
        ListingName: getRandomListingName(),
        ImageUrls: imageUrls,
        ...getRandomQuantityAndPrice(),
    });
    // console.log("Document written with ID: ", docRef.id);
}

// Helper functions
function getRandomLocation() {
    const minLat = 1.15; // Minimum latitude for Singapore
    const maxLat = 1.47; // Maximum latitude for Singapore
    const minLng = 103.6; // Minimum longitude for Singapore
    const maxLng = 104.05; // Maximum longitude for Singapore

    const latitude = Math.random() * (maxLat - minLat) + minLat;
    const longitude = Math.random() * (maxLng - minLng) + minLng;

    return { latitude, longitude };
}

// Function to generate a random listing name
function getRandomListingName() {
    /* const names = [
        "apple",
        "banana",
        "orange",
        "strawberry",
        "grape",
        "kiwi",
        "mango",
        "watermelon",
        "pineapple",
        "blueberry",
        "cherry",
        "pear",
        "lemon",
        "peach",
    ];

    const names = [
        "Tomato Soup",
        "Tuna",
        "Green Beans",
        "Corn",
        "Longans",
        "Creamed Corn",
        "Black Beans",
        "Chilli",
        "Sardines",
        "Pineapple Chunks",
        "Baked Beans",
        "Cream of Mushroom Soup",
        "Canned plums",
        "Applesauce",
        "Luncheon Meat",
    ];

    const names = [
        "Pasta",
        "Grilled Salmon",
        "Vegetable Stir-Fry",
        "Mashed Potatoes",
        "Fried Rice",
        "Roast Chicken",
        "Pork Chops",
        "Vegetable Curry",
        "BBQ Ribs",
        "Hainanese Chicken Rice",
        "Laksa",
        "Char Kway Teow",
        "Satay",
        "Roti Prata",
        "Nasi Lemak",
        "Kaya Toast",
    ]; */

    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

// Function to generate a random quantity and price
function getRandomQuantityAndPrice() {
    const quantity = Math.floor(Math.random() * 100) + 1; // Random quantity between 1 and 100
    const price = (Math.random() * 100 + 1).toFixed(2); // Random price between 1 and 100, rounded to 2 decimal places
    return { QtyAvailable: quantity, Price: price };
}

// Function to generate a random date within 4 years from now
function getRandomExpiryDate() {
    const minDate = new Date(2020, 0, 1);
    const maxDate = new Date(2023, 11, 31);
    const randomDate = new Date(
        minDate.getTime() +
            Math.random() * (maxDate.getTime() - minDate.getTime())
    );
    return randomDate;
}

// Function to generate a random boolean value for Perishable
function getRandomPerishable() {
    return Math.random() < 0.5; // 50% chance of being true or false
}

// used to initialise categories collection in firebase
async function addCategories(foodCategories) {
    const docRef = await addDoc(collection(db, "categories"), {
        categories: foodCategories,
    });
    console.log("Document written with ID: ", docRef.id);
}

// Create 10 random users with 10 listings and 10 chopes each
async function addRandomUsers() {
    const uids = [
        { id: "hLsxEeCGy9aikhnx1t5h41JJpfx2", email: "abc@123.com" },
        {
            id: "mqSYVrEMlng7sObUxUkqYv6VNIy1",
            email: "zxlee.2022@scis.smu.edu.sg",
        },
        { id: "bo4p9RULhzTR7BO6ERHPzXqJFZ63", email: "elephant@gmail.com" },
        {
            id: "qY7DY1vLaCZkB2XubzS6gwePiIr1",
            email: "justinlee01.jl@hmail.com",
        },
        { id: "kqAvshLF4cdmISgqj5DpsSRKIbd2", email: "cat@gmail.com" },
        { id: "8BT1kBQSvAMqcSFqOp0dgQoM8d23", email: "dog@gmail.com" },
        {
            id: "o9V5ztWbHdgC0gYzYdsweEeYVUH3",
            email: "glenda.ng.2021@business.smu.edu.sg",
        },
        {
            id: "dsixaJZEmYWbBHcFxA3ACRyZiIp1",
            email: "justinlee01.jl@gmail.com",
        },
    ];
    for (let i = 0; i < uids.length; i++) {
        const listings = await getAllListings();
        const { selectedListings, selectedChopes } =
            selectRandomListingsAndChopes(listings);
        let userType;
        if (i % 2 === 0) {
            userType = "individual";
        } else {
            userType = "business";
        }

        const chance = new Chance();

        const firstName = chance.first();
        const lastName = chance.last();
        const username = chance.twitter();

        // Add a new document in collection "listings"
        await setDoc(doc(db, "userInformation", uids[i].id), {
            firstName: firstName,
            lastName: lastName,
            username: username,
            chopes: selectedChopes,
            accountType: userType,
            email: uids[i].email,
        });
        console.log("Document written with ID: ", uids[i]);
    }
}

// Function to generate a random email and password
function generateRandomUser() {
    const email = Math.random().toString(36).substring(2, 5) + "@example.com";
    const password = Math.random().toString(36).substring(2, 10);
    return { email, password };
}

// Function to randomly select 10 listings and 10 chopes
function selectRandomListingsAndChopes(listings) {
    const selectedListings = [];
    const selectedChopes = [];
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * listings.length);
        selectedListings.push(listings[randomIndex].Id);
        selectedChopes.push({
            listingId: listings[randomIndex].Id,
            collected: Math.random() < 0.5,
            timestamp: Timestamp.fromDate(getRandomChopeDate()),
        });
    }
    return { selectedListings, selectedChopes };
}

function getRandomChopeDate() {
    const minDate = new Date(2023, 9, 25);
    const maxDate = new Date(2023, 10, 14);
    const randomDate = new Date(
        minDate.getTime() +
            Math.random() * (maxDate.getTime() - minDate.getTime())
    );
    return randomDate;
}

async function addListingOwners() {
    let counter = 0;
    const listings = await getAllListings();
    const uids = [
        "hLsxEeCGy9aikhnx1t5h41JJpfx2",
        "mqSYVrEMlng7sObUxUkqYv6VNIy1",
        "bo4p9RULhzTR7BO6ERHPzXqJFZ63",
        "qY7DY1vLaCZkB2XubzS6gwePiIr1",
        "kqAvshLF4cdmISgqj5DpsSRKIbd2",
        "8BT1kBQSvAMqcSFqOp0dgQoM8d23",
        "o9V5ztWbHdgC0gYzYdsweEeYVUH3",
        "dsixaJZEmYWbBHcFxA3ACRyZiIp1",
    ];

    for (const listing of listings) {
        await setDoc(
            doc(db, "listings", listing.Id),
            {
                Owner: uids[Math.floor(Math.random() * uids.length)],
            },
            { merge: true }
        );
        console.log("Document written with ID: ", listing.Id);
        counter++;
    }
    console.log(counter + " documents updated");
}

async function updateOwnerListings() {
    const listings = await getAllListings();

    for (const listing of listings) {
        const owner = listing.details.Owner;
        const userData = await getUser(owner);
        // console.log(userData);

        if (userData.hasOwnProperty("myListings")) {
            let userListings = userData.myListings;
            userListings.push(listing.Id);
            await setDoc(
                doc(db, "userInformation", owner),
                {
                    myListings: userListings,
                },
                { merge: true }
            );
        } else {
            let userListings = [listing.Id];
            await setDoc(
                doc(db, "userInformation", owner),
                {
                    myListings: userListings,
                },
                { merge: true }
            );
        }
    }
}

async function addLocationName() {
    let counter = 0;
    const listings = await getAllListings();
    const locations = [
        "Orchard Road",
        "Marina Bay Sands",
        "Gardens by the Bay",
        "Sentosa Island",
        "Chinatown",
        "Clarke Quay",
        "Merlion Park",
        "Singapore Zoo",
        "Universal Studios Singapore",
        "Haw Par Villa",
        "Bukit Timah Nature Reserve",
        "Fort Canning Park",
        "East Coast Park",
        "Pulau Ubin",
        "MacRitchie Reservoir"
      ];

    for (const listing of listings) {
        let location = listing.details.Location;
        location.name = locations[Math.floor(Math.random() * locations.length)];
        await setDoc(
            doc(db, "listings", listing.Id),
            {
                Location: location,
            },
            { merge: true }
        );
        console.log("Document written with ID: ", listing.Id);
        counter++;
    }
    console.log(counter + " documents updated");
}

export {
    addRandomListing,
    deleteListings,
    addRandomUsers,
    addListingOwners,
    updateOwnerListings,
    addLocationName,
};
