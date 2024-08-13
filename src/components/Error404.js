export default function Error404(props) {
    return (
        <div className="text-red-600 my-3">
            <h3 className="flex ">Error!</h3>
            {props.errorType ? (
                <p className="text-lg">{props.errorType}</p>
            ) : (
                <p className="text-lg">Page not found.</p>
            )}
            <p className="text-lg">{props ? props.errorMessage : null}</p>
        </div>
    );
}
