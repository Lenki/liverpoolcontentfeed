const storeData = (document, data, database) => {
    try {
        const docRef = database.collection('feeds').doc(document);
        docRef.set(data);
        console.log('successfully wrote to ' + document)
    } catch (error) {
        console.log(error)
    }
};

exports.storeData = storeData;