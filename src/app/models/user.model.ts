export class User {
    apellido_Materno: string;
    apellido_Paterno: string;
    email: string;
    id: number;
    nombre: string;
    nombre_Usuario: string;
    primer_Login: boolean;
    telefono: string;
    rfc: string;
    razon_social: string;
    tipo_persona: string;
    accesos: any[];
    constructor(
        public user?: string,
        public password?: string
    ) { }

}