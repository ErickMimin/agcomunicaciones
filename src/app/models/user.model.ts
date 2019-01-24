export class User {
    apellido_Materno: string;
    apellido_Paterno: string;
    email: string;
    id: number;
    nombre: string;
    nombre_Usuario: string;
    primer_Login: boolean;
    telefono: string;

    constructor(
        public user?: string,
        public password?: string
    ) { }

}