import { BASE } from "../constant"
export type CafeDTO = {
  id : string,
  name : string,
  description : string,
  logo? : string,
  location : string
}
export async function postCafe(cafe : any) {
    const res = await fetch(`${BASE}/cafe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(cafe), // Convert the data object to JSON string
      });
}

export async function getCafes(location : string | undefined) {
    const locationQuery = "?location=" + (location ? location : "");
    const response = await fetch(
        `${BASE}/cafes${locationQuery}` ,
    )
    return await response.json()
}

export async function getCafe(id : string) : Promise<CafeDTO> {
  const idQuery = "?id=" + (id ? id : "");
  const response = await fetch(
      `${BASE}/cafe${idQuery}` ,
  )
  return await response.json()
}

export async function putCafe(cafe : any) {
  const res = await fetch(`${BASE}/cafe`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(cafe), // Convert the data object to JSON string
    });
}

export async function deleteCafe(cafe : string) {
  const res = await fetch(`${BASE}/cafe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({cafeId : cafe}), // Convert the data object to JSON string
    });
}