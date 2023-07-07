export async function getFetch(path, signal){
    let response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        signal: signal,
    });
    return await response.json();
}

export async function deleteFetch(path, signal) {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        method: 'DELETE',
        signal: signal,
    });
    return await response;
}

export async function postFetch(path, body, signal) {
    const token = sessionStorage.getItem('token');
    
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    let response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      signal: signal,
    });
  
    return await response.json();
  }
  

export async function putFetch(path, body, signal) {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: signal,
    });
    return await response.json();
}