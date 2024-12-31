'use client';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function ImportExport() {
    const [importing, setImporting] = useState(false);
    const [exporting, setExporting] = useState(false);

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setImporting(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post('/api/admin/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Data imported successfully');
        } catch (error) {
            console.error('Import error:', error);
            alert('Error importing data');
        } finally {
            setImporting(false);
        }
    };

    const handleExport = async () => {
        setExporting(true);
        try {
            const response = await api.get('/api/admin/export', {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'movies-export.json');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Export error:', error);
            alert('Error exporting data');
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Import/Export Data</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="font-medium mb-2">Import Data</h3>
                    <label className="block">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            disabled={importing}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                    </label>
                    {importing && <p className="mt-2 text-sm text-gray-500">Importing...</p>}
                </div>

                <div>
                    <h3 className="font-medium mb-2">Export Data</h3>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {exporting ? 'Exporting...' : 'Export Data'}
                    </button>
                </div>
            </div>
        </div>
    );
}