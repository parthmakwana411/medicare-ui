import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MedicineSeriesService {
    constructor() {}

    getMedicineSeries(): Observable<any[]> {
        return of([
            {
                id: '8e4d7f6c-9b43-4a23-82c1-8c64c55d0001',
                label: 'Medicines',
                items: [
                    { id: 'd2f3a6b7-6e1a-4d93-a7e3-2fbc112f0002', label: 'All Medicines' },
                    { id: 'c9b8f3d4-1e34-4a9a-9af8-3fbd76a40003', label: 'All Brands' }
                ]
            },
            {
                id: '1b9f6c8a-1d29-4c38-a6e1-7a2c111d0004',
                label: 'Personal Care',
                items: [
                    {
                        id: 'e3c7a9f2-4f8b-4a34-8d92-4fbc554f0005',
                        label: 'Skin Care',
                        items: [
                            { id: '4c7d1e2b-2f9a-4d23-9b7d-6a4d88a60006', label: 'Face Wash' },
                            { id: 'b7e4a8c2-1a38-4f93-8d7e-1a6c32a70007', label: 'Cleanser' },
                            { id: 'a6f7c4e1-3d27-4b8a-8e7b-2b7d99b80008', label: 'Exfoliator / Scrub' },
                            { id: 'f8c1d3a7-9e23-41a9-9d8e-3c4f55c90009', label: 'Moisturizer' },
                            { id: 'c2b8e1a6-7f9a-4c7b-9a7e-8f7b66d10010', label: 'Sunscreen / Sun Care' }
                        ]
                    },
                    { id: '5d1e3c8b-2f8a-4d6c-8a9e-4f7c55a10011', label: 'Hair Care' },
                    { id: '7f3a1c2e-9d4b-4a7f-9b2e-5a6c77b20012', label: 'Baby & Mom Care' },
                    { id: '8e2c4a1d-3b7f-4c9d-8a1e-6f7d99c30013', label: 'Sexual Wellness' },
                    { id: '9a7f2b3c-1e4d-4f8a-9c2e-7a8d22d40014', label: 'Oral Care' },
                    { id: '6d3f1e2b-7c8a-4a9f-9b2d-8f9c44e50015', label: 'Elderly Care' }
                ]
            },
            {
                id: '2f7c9a1b-8d4e-4a3c-9b7d-1c2f33f60016',
                label: 'Health Conditions',
                items: [
                    { id: '3e2d1c7b-9a4f-4f8d-9a1e-2f7c66a70017', label: 'Bone & Joint Care' },
                    { id: '4a7d3c8e-2b9f-4c7a-8d1e-3a8f55b80018', label: 'Digestive Care' },
                    { id: '5f1c2e3a-7d8b-4f9c-9a2e-4b9d77c90019', label: 'Eye Care' },
                    { id: '6b3d1a9e-8f2c-4c7a-9e1f-5c7e22d10020', label: 'Pain Relief' },
                    { id: '7a2c3e4b-9f8d-4a6c-8d1f-6a8e55e20021', label: 'Respiratory Care' },
                    { id: '8d1f2b3a-7c9e-4f8a-9d2e-7f9d11f30022', label: 'Mental Wellness' },
                    { id: '9c2e4a1b-8d7f-4a9c-8f1e-8a7d22g40023', label: 'Liver Care' },
                    { id: '1f3a2c7e-9b4d-4c8a-9f2e-9b8d55h50024', label: 'Heart Care'},
                    { id: '2d7f3a1c-8e9b-4f7a-8c2e-1c7f66i60025', label: 'Kidney Care' }
                ]
            },
            {
                id: '3b8a1d2e-7c9f-4f6a-9a2d-2f9e77j70026',
                label: 'Vitamins & Supplements',
                items: [
                    { id: '4c7f2a1b-8d3e-4a9c-9f2e-3a7d55k80027', label: 'Multivitamins' },
                    { id: '5d8e3c2a-9f1b-4a7f-9c2e-4b8e66l90028', label: 'Calcium & Minerals' },
                    { id: '6a1c4d3e-7f9b-4c8a-9e1f-5c7d77m10029', label: 'Vitamin A-Z' },
                    { id: '7f2b3c4a-8e9d-4f7a-9c2e-6a8d11n20030', label: 'Protein Supplements' },
                    { id: '8c3e1d2f-9b4a-4c7c-9f1e-7a9e22o30031', label: 'Immunity Boosters' },
                    { id: '9b2a3c4e-7d8f-4a9c-8f2e-8b7f33p40032', label: 'Omega & Fish Oil' }
                ]
            },
            {
                id: '4f7a2c3b-9d8e-4f6a-8c1e-3f9a44q50033',
                label: 'Diabetes Care',
                items: [
                    { id: '5a8c3d2e-7f1b-4a9c-9f2e-4c8e55r60034', label: 'Test Strips & Lancets' },
                    { id: '6d2b3c4a-8f9e-4a7f-9c2e-5a9d66s70035', label: 'Blood Glucose Monitors' },
                    { id: '7c3a1d2f-9b8e-4f7a-8e2e-6b8e77t80036', label: 'Diabetic Diet' },
                    { id: '8b2c3a4d-7f9e-4a9c-9e2e-7c7f11u90037', label: 'Sugar Substitutes' },
                    { id: '9a3d1b2c-8e9f-4a7c-9f2e-8d9e22v10038', label: 'Syringes & Pens' }
                ]
            },
            {
                id: '5e8f3c2a-9b7d-4f6a-9e2c-4f9e88w10039',
                label: 'Healthcare Devices',
                items: [
                    { id: '6f9a1c3b-8d2e-4a9f-9c2e-5f8d22x20040', label: 'BP Monitors' },
                    { id: '7a2b3c4d-9e8f-4a7c-9e2e-6a9e33y30041', label: 'Nebulizers & Vaporizers' },
                    { id: '8c3d1e2a-7f9b-4c8f-9d2e-7b7d44z40042', label: 'Supports & Braces' }
                ]
            },
            {
                id: '6d9e2c3a-8f7b-4a9c-9e2e-8c8e55a50043',
                label: 'Homeopathic Medicine',
                items: [
                    { id: '7b1a3c2d-9f8e-4a7c-9e2e-9d9f66b60044', label: 'Skin Care' },
                    { id: '8c2b3a4e-7f9d-4c8a-9f2e-1e7a77c70045', label: 'Digestive Care' },
                    { id: '9d3c1b2a-8e9f-4a7c-9f2e-2f8b11d80046', label: 'Heart Care' },
                    { id: '1e4a2b3c-7f8d-4f7a-9c2e-3g9c22e90047', label: 'Kidney Care' },
                    { id: '2f5c3d1a-9e8f-4a7c-9e2e-4h8d33f10048', label: 'Sexual Health' },
                    { id: '3g6a2c1b-8f9e-4a7c-9e2e-5i7e44g20049', label: 'Diabetes Care' },
                    { id: '4h7b3c2a-9e8f-4c7a-9f2e-6j8f55h30050', label: 'Cold & Cough' }
                ]
            },
            {
                id: '7f8c3d2a-9e1b-4f6a-9e2e-7k9g66i40051',
                label: 'Health Guide',
                items: [
                    { id: '8g9a1c2b-7f9e-4a7c-9f2e-8l7h77j50052', label: 'Health Articles' },
                    { id: '9h1b2c3a-8f9e-4a7c-9e2e-9m8i88k60053', label: 'Diseases & Conditions'},
                    { id: '1i2c3d4b-7e8f-4a9c-9f2e-1n9j99l70054', label: 'Health Stories' },
                    { id: '2j3d4a5c-9f7e-4a7c-9e2e-2o1k11m80055', label: 'Ayurveda' }
                ]
            }
        ]);
    }
}
