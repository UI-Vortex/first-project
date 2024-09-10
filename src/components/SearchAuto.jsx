import { useEffect, useState } from "react"
import Suggest from "./Suggest"

export default function SearchAuto() {

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [searchParam, setSearchParam] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState([])

    function handleChange(event) {
        const query = event.target.value.toLowerCase()
        setSearchParam(query)
        if (query.length > 1) {
            const filteredData = users && users.length ?
                users.filter(item => item.toLowerCase().indexOf(query) > -1)
                : []
            setFilteredUsers(filteredData)
            setShowDropdown(true)
        } else {
            setShowDropdown(false)
        }
    }

    function handleClick(event) {
        setShowDropdown(false)
        setSearchParam(event.target.innerText)
        setFilteredUsers([])
    }

    function handleClear() {
        setSearchParam('')
    }

    async function fetchListOfUsers() {
        try {
            setLoading(true)
            const response = await fetch('https://dummyjson.com/users')
            const data = await response.json()
            if (data && data.users && data.users.length) {
                setUsers(data.users.map(userItem => userItem.firstName))
                setLoading(false)
                setError(null)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            setError(error)
        }
    }

    useEffect(() => {
        fetchListOfUsers()
    }, [])

    console.log(users, filteredUsers)


    return (
        <div className="search-autocomplete-container">
            {
                loading ? <h1>Loading Data ! Please Wait</h1> : (
                    <input onChange={handleChange} value={searchParam} name="search-users" type="text" placeholder="Search Users..." />

                )
            }
            <button onClick={handleClear}>Clear</button>
            {
                showDropdown && <Suggest handleClick={handleClick} data={filteredUsers} />
            }
        </div>
    )
}