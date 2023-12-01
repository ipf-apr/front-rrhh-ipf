export const showGender = (gender) => {
    switch (gender) {
        case 'f':
            return 'Femenino'
            break;
        case 'm':
            return 'Masculino'
            break;
        case 'x':
            return 'No binario'
            break;
        case 'o':
            return 'Otro'
            break;    
        default:
            return 'No especificado'
            break;
    }
}