export default function Button({ children, onClick, type = 'button', disabled = false }: any) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-md text-white ${disabled ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
            {children}
        </button>
    );
}