import React from 'react';

const ErrorComponent: React.FC<{ error: unknown; refetch: () => void }> = ({ error, refetch }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Error al cargar los datos
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error instanceof Error
            ? error.message
            : "Ocurrió un error al cargar los productos"}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
