
export function fetchList(){
    return fetch('/api/list.json').then((result) => {
        // console.log(result)
        return result.json()
    })
}