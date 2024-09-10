export default function Suggest({ data, handleClick }) {
    return <ul>
        {
            data && data.length ? data.map((item, index) => <li style={{cursor: 'pointer'}} onClick={handleClick} key={item.index}>{item}</li>) : null
        }
    </ul>
}