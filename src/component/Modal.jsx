import React from 'react';

function Modal({ showModal, setShowModal, title, children, onSave, tempProduct, isDelete }) {
    if (!showModal) return null;

    const handleSave = async (tempProduct) => {
        try {
            await onSave(tempProduct);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" name="modal">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-5/6 sm:min-w-4/5 lg:w-[1024px]">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-xl leading-6 font-medium text-gray-900 border-b pb-2 mb-2" id="modal-title">
                            {title}
                        </h3>
                        <div className="container sm:flex sm:items-start" name="modal-content">
                            {children}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${ isDelete ? 'bg-red-600 hover:bg-red-700' : '' }` }
                            onClick={()=>handleSave(tempProduct)}
                        >
                            { isDelete ? 'Delete' : 'Save' }
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;