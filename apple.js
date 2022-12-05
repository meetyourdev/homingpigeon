const { sendMessage } = require("./bot");
const checkAppleStore = () => {
  fetch(
    "https://www.apple.com/ca/shop/bagx?_a=search&_m=shoppingCart.items.item-66828b95-b40e-44fd-a505-bbf6c2e23d91.delivery.storeLocator",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        modelversion: "v2",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        syntax: "graviton",
        "x-aos-model-page": "cart",
        "x-aos-stk": "lZGwnV2ztZaLZ1RvvFrmEg7VTGDjExMjlgFgmBu53ak",
        "x-requested-with": "Fetch",
        cookie:
          "geo=CA; s_fid=05633B175BDF2556-0CC78BA65D3F4459; s_cc=true; s_vi=[CS]v1|31C7330638A23370-40000AD37670E584[CE]; as_dc=ucp1; dssf=1; dssid2=a0717428-ac1f-4d4f-8ba6-1176a0c27b45; as_pcts=wxJ7a9ncf-zyR7iF1T_JC8Dy37uAfgdV3g3qJNRZbQrZ7q91ybOFPk4iD2f05:Uq0_2u-4wNEXrswQ9e9:LHMpqFEEZjur8DA97MlTgaIs+95mX9tL5u7K7_qRELI3YXG7IV5a+raEB7RnulW8j3a3Jglnt-; as_sfa=MnxjYXxjYXx8ZW5fQ0F8Y29uc3VtZXJ8aW50ZXJuZXR8MHwwfDE; as_gloc=4bd26d9152bfa3ba8f63af7835cc44244c08c178414bfe1885a5c3a643b0be664021a48d76120809131617d6c7054f9e3c1c0226c6192ba38b217f13460b421ca8aee03ab8e8f4f9643f15fd27dcf1a378239614acc0b28e69c35206c638a28d; as_atb=1.0|MjAyMi0xMi0wNSAwMTo0NDowMQ|4bda45e01680972a254afcb45a4a49842432a98d; pxro=1; as_uct=0; s_sq=%5B%5BB%5D%5D",
        Referer: "https://www.apple.com/ca/shop/bag",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: "shoppingCart.items.item-66828b95-b40e-44fd-a505-bbf6c2e23d91.delivery.storeLocator.selectStore=&shoppingCart.items.item-66828b95-b40e-44fd-a505-bbf6c2e23d91.delivery.storeLocator.searchInput=V5H%203Y7",
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((resJson) => {
      const fs = require("fs");
      fs.writeFileSync("file.json", JSON.stringify(resJson));
      let retailStores =
        resJson.body.shoppingCart.items[
          Object.keys(resJson.body.shoppingCart.items)[0]
        ].delivery.storeLocator.searchResults.d.retailStores;
      let message = "";
      retailStores.map((store) => {
        if (store.availability.storeAvailability != "Currently unavailable") {
          message += `${store.storeName} : ${store.availability.storeAvailability}\n`;
        }
      });
      if (message != "") {
        sendMessage(message);
      } else {
        console.log(`(${new Date()} "Not available at any nearby stores`);
      }
    });
};

module.exports = checkAppleStore;
