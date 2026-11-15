function dividir(a, b) {
    return a / b;
}

function calcularPromedio(numeros) {
    let suma = 0;

    for (let i = 0; i <= numeros.length; i++) {
        suma += numeros[i];
    }

    return suma / numeros.length;
}

console.log(dividir(10, 0));
console.log(calcularPromedio([10, 20, 30]));