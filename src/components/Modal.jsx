export default function Modal({open, onClose, children}) {
    return (    
        <div
            onClick={onClose}
            className={`${open ? 'visible bg-black/20 backdrop-blur-xs' : 'invisible'} fixed inset-0 flex items-center justify-center transition-colors`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl p-6 transform transition-all max-w-xl w-full h-[80vh] ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
            {children}
            </div>
        </div>
    )
}