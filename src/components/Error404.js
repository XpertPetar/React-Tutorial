export default function Error404(props) {
    return (
        <div className="text-red-600 capitalize">
            <h1 className="flex justify-center ">Error 404!</h1>
            <p className="text-center text-xl">Page doesn't exist.</p>
            <p className="text-center text-lg">{props ? props.errorMessage : null}</p>
        </div>
    );
}
