import { BASE } from "../constant"
export async function postEmployee(employee : any) {
    const res = await fetch(`${BASE}/employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(employee), // Convert the data object to JSON string
      });
}

export async function getEmployees(employee : string | undefined) {
    const locationQuery = "?cafe=" + (employee ? employee : "");
    const response = await fetch(
        `${BASE}/employees${locationQuery}` ,
    )
    return await response.json()
}

export async function getEmployee(id : string) {
  const idQuery = "?id=" + (id ? id : "");
  const response = await fetch(
      `${BASE}/employee${idQuery}` ,
  )
  return await response.json()
}

export async function putEmployee(employee : any) {
  const res = await fetch(`${BASE}/employee`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(employee), // Convert the data object to JSON string
    });
}

export async function deleteEmployee(employeeId : string) {
  const res = await fetch(`${BASE}/employee`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({employeeId : employeeId}), // Convert the data object to JSON string
    });
}