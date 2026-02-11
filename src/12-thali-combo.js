/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here

  if (typeof (thali) !== "object" || thali === null || !thali.name || thali?.items?.length === 0 || !thali.price || typeof (thali.isVeg) !== "boolean") return "";

  return `${thali.name.toUpperCase().trim()} (${thali.isVeg ? "Veg" : "Non-Veg"}) - Items: ${thali.items.join(", ")} - Rs.${thali.price.toFixed(2)}`
}

export function getThaliStats(thalis) {
  // Your code here

  if (!Array.isArray(thalis) || !thalis.length || thalis === null) return null;

  let response = { totalThalis: 0, vegCount: 0, nonVegCount: 0, avgPrice: "", cheapest: 0, costliest: 0, names: [] }

  response.totalThalis = thalis.length;
  thalis.map(thali => thali.isVeg ? response.vegCount++ : response.nonVegCount++);
  const totalPrice = thalis.reduce((acc, curr) => acc + curr.price, 0);
  response.avgPrice = (totalPrice / thalis.length).toFixed(2);
  response.costliest = thalis.reduce((max, thali) => Math.max(max, thali.price), -Infinity);
  response.cheapest = thalis.reduce((min, thali) => Math.min(min, thali.price), Infinity);
  thalis.map(thali => response.names.push(thali.name));

  return response;

}

export function searchThaliMenu(thalis, query) {
  // Your code here

  if (!Array.isArray(thalis) || typeof(query) !== "string") return []

  return thalis.filter(item => {
    return Object.entries(item).join(" ").toLowerCase().includes(query.toLowerCase())
  })
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here

  if (!Array.isArray(thalis) || thalis.length === 0 || typeof(customerName) !== "string") return "";
  const items = thalis.map(thali => `- ${thali.name} x Rs.${thali.price}`);
  const total = thalis.reduce((acc, curr) => acc + curr.price ,0)

  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${items.join("\n")}\n---\nTotal: Rs.${total}\nItems: ${thalis.length}`;
}
