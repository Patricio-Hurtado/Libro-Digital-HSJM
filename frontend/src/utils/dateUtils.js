export const formatearFecha = (fechaRaw) => {
    if (!fechaRaw) return "No asignado";
    
    const fecha = new Date(fechaRaw);
    if (isNaN(fecha.getTime())) return "Fecha inválida";

    const dia = String(fecha.getUTCDate()).padStart(2, '0');
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
    const anio = fecha.getUTCFullYear();

    return `${dia}/${mes}/${anio}`;
};