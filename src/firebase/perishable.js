const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const usersRef = admin.firestore().collection("userInformation");

exports.deleteExpiredReservations = functions.pubsub
    .schedule("every 1 hours")
    .onRun(async (context) => {
        const now = admin.firestore.Timestamp.now();
        const userSnapshot = await usersRef.get();
        const batch = admin.firestore().batch();

        userSnapshot.forEach((userDoc) => {
            const user = userDoc.data();
            if (user.chopes) {
                const chopes = user.chopes;
                chopes.forEach((chope) => {
                    const chopeRef = chope.ref;
                    const chopeAge =
                        now.toMillis() - chope.timestamp.toMillis();

                    if (!chope.collected) {
                        const listingRef = admin
                            .firestore()
                            .collection("listings")
                            .doc(chope.listingId);
                        listingRef.get().then((listingDoc) => {
                            const listing = listingDoc.data();
                            const perishable = listing.Perishable || false;

                            if (
                                perishable &&
                                chopeAge > 12 * 60 * 60 * 1000
                            ) {
                                batch.delete(chopeRef);
                            } else if (
                                !perishable &&
                                chopeAge > 48 * 60 * 60 * 1000
                            ) {
                                batch.delete(chopeRef);
                            }
                        });
                    }
                });
            }
        });

        await batch.commit();
    });
