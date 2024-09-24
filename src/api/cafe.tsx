import { BASE } from "../constant"
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
    console.log(`${BASE}/cafes` + new URLSearchParams(locationQuery))
    return await response.json()
}

export async function getCafe(id : string) {
  const idQuery = "?id=" + (id ? id : "");
  const response = await fetch(
      `${BASE}/cafe${idQuery}` ,
  )
  console.log(`${BASE}/cafes` + new URLSearchParams(idQuery))
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