export function fetchList() {
    return fetch('/api/buy-list.json').then((result) => {
        // console.log(result)
        return result.json()
    })
}