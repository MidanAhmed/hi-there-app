export default function Button({ label, handlefunc }) {
    return (
        <button onClick={handlefunc}>{label}</button>
    )
}