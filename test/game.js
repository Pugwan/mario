function checkcointobuy(item) {
  return getUserId()
    .then((userId) => {
      return database
        .listDocuments(databaseId, "6555bf92364ff69f80d2", [
          Query.equal("userId", userId),
        ])
        .then((response) => {
          const userItems = response.documents;
          const skinprice = item.price;
          const totalcoin = userItems[0].coin;
          if (totalcoin < skinprice) {
            return "Not enough coin";
          } else {
            const sum = totalcoin - skinprice;
            return sum;
          }
        })
        .catch((error) => {
          console.error(error);
          throw error; // Re-throw the error to propagate it
        });
    })
    .catch((error) => {
      console.error(error);
      throw error; // Re-throw the error to propagate it
    });
}

function buyItem(item) {
  checkcointobuy(item)
    .then((coincurrent) => {
      if (typeof coincurrent === "number") {
        // เพิ่มเงื่อนไขตรวจสอบว่า coincurrent เป็นตัวเลขหรือไม่
        getUserId().then((userId) => {
          const newDocumentId = ID.unique();
          database.createDocument(
            databaseId,
            "6562165e1490741e8632",
            newDocumentId,
            {
              userId: userId,
              skins: item.name,
            }
          );
          database
            .updateDocument(databaseId, "6555bf92364ff69f80d2", userId, {
              userId: userId,
              coin: coincurrent,
            })
            .then(() => {
              alert("Buy successfully!");
              go("shop");
              showCoin();
            })
            .catch((error) => {
              go("shop");
              showCoin();
              console.error(error);
            });
        });
      } else {
        alert(coincurrent + "!");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
async function getUserId(){
    return account.get().then(response => {
      return response.$id
    }).catch(error => console.error(error))
}

module.exports = { checkcointobuy, buyItem };
