function a() {
    console.log('Execultando a()')
}

function b() {
    console.log('Execultando b()')
}

function c() {
    console.log('Execultando c()')
    a()
    b()
}


c()