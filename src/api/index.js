export default function apiCall({
    url,
    params,
    body,
    headers,
    method
}){
    return fetch(url,{params,body,headers,method})
}