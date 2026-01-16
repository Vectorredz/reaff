export default function Add( { handler, ref, list} ) {
    return (
        <div>
            <input type="text" className="text-field" ref={ref} />
            <button onClick={(e) => handler(e, list, ref)}>add</button>
        </div>
    );
}