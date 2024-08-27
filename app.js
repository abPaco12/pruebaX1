function userfrm()
{
    let tk=`
    <form id='f1' class='axfrmmed'>
        <center>REGISTRAR</center>
        <label>NOMBRE</label>
        <input name='nom'>
        
        <label>APELLIDO</label>
        <input name='ap'>
        
        <label>CARNET DE IDENTIDAD</label>
        <input name='ci'>
        
        <label>CONTRASEÑA</label>
        <input name='pwd' type='password'>
        <button>GUARDAR</button>
    </form>`;
    axload('c1',tk);
    axelem('f1').addEventListener('submit',async e=>
    {
            e.preventDefault();
            let data=await axdatapost(`api/usersave`,'f1');
            console.log(data);
            if(data.resp)
            {axmsgok('SE GUARDO');}
            else
            {axmsgerr('NO SE GUARDO');}
    })
}
function login(){
    let tk=`
    <form id='f2' class='axfrmmed axw-frm axbr-2'>
        <center>INICIO DE SESION</center>
        <label>CARNET</label>
        <input name='ci'>
        <label>CONTRASEÑA</label>
        <input name='pwd' type='password'>
        <button>INGRESAR</button>
    </form>`;
    axload('c1',tk);
    axelem('f2').addEventListener('submit',async e=>{
        e.preventDefault();
        let data=await axdatapost(`api/login`,'f2');
        console.log(data);
        if(data.resp){
            axtokenset(data.num,`${data.nom} ${data.ap}`,'',[]);
            axmsgmin('SE INICIO SESION');
            inicio();
        }
        else{
            axmsgerr('CONTRASEÑA INCORRECTA');}
    })
}
function inicio(){
    let tk=`
    <header>
        <nav>
            <a>INICIO</a>
            <a>NOSOTROS</a>
            <button class='axico399' onclick='axtokendel("index.html")'></button>
        </nav>
    </header>
    <main>
        <section id='c2'></section>
        <nav class='axmenmed'>
            <center>${axtokenget('name')}</center>
            <a onclick='userlist()'>LISTA DE USUARIO</a>
            <a onclick='autofrm(0,"")'>REGISTAR AUTO</a>
            <a onclick='autolist()'>LISTA DE AUTOS</a>
            <a onclick='axtokendel("index.html")'>CERRAR SESION</a>
        </nav>
    </main>
    <footer>
        <section id='v1' class='axwinmed'>
            <button class='axico168' onclick="axwinclose('v1')"></button>
            <article id='v1c'>
            </article>
        </section>
    </footer>`;
    axload('c1',tk);
}
async function userlist(){
    let tk=`
    <h2 class='axtitle'>LISTA DE USUARIO</h2>`;
    let data=await axdataget(`api/userlist`);
    for (p=0;p<data.list.length;p++){
        tk+=`
        <section class='axlistmed'>
            <article>
                <h2>${data.list[p].nom} ${data.list[p].ap}</h2>
                <a class='axico421' onclick='axelemshow("menu${data.list[p].num}")'></a>
                <div id='menu${data.list[p].num}' onclick='axelemhide("menu${data.list[p].num}")'>
                    <nav class='axmenmed'>
                        <a onclick="autofrm(${data.list[p].num},'${data.list[p].nom}')">REGISTRAR AUTO</a>
                    </nav>
                </div>
            </article>
        </section>`;
    }
    axload('c2',tk);
}
function autofrm(num,nom){
    let tk=`
    <form id='f3' class='axfrmmed'>
        <center>REGISTRO DE AUTOS</center>
        <aside>
            <h2 id='usercap'>${nom}</h2>
            <input id='userid' name='num' value='${num}'>
            <a class='axico117' onclick='userselec("userid","usercap","")'></a>
        </aside>
            <input name='placa' placeholder='PLACA'>
            <input name='chas' placeholder='CHASIS'>
            <input name='mode' placeholder='MODELO'>
            <textarea name='des'></textarea>
            <button>GUARDAR</button>
    </form>`;
    axload('c2',tk);
    axelem('f3').addEventListener('submit',async e=>{
        e.preventDefault();
        let data=await axdatapost(`api/autosave`,'f3');
        console.log(data);
        if(data.resp){
            axmsgok('SE REGISTRO');}
        else{
            axmsgerr('NO SE REGISTRO')}
    })
}
async function userselec(ide,cap,busq){
    axwinopen('v1');
    if(busq==undefined){busq='';}
    let data=await axdataget(`api/userlist/${busq}`);
    console.log(data);
    let tk=`
    <form id='f4' class='axbarmed'>
        <button class='axico117'></button>
        <input id='BUSQ' value='${busq}'>
    </form>`;
    for(p=0;p<data.list.length;p++){
        tk+=`
        <section class='axlistmed axefecfocus' onclick="axelem('${ide}').value=${data.list[p].num}; axelem('${cap}').innerHTML='${data.list[p].nom}'; axwinclose('v1');">
            <article>
                <h2>${data.list[p].nom} ${data.list[p].ap}</h2>
            </article>
        </section>`;
    }
    axload('v1c',tk);
    axelem('f4').addEventListener('submit',e=>{
        e.preventDefault();
        userselec(ide,cap,axelem('BUSQ').value);
    })    
}


async function autolist(){
    let tk=`
    <h2 class='axtitle'>LISTA DE AUTO</h2>`;
    let data=await axdataget(`api/autolist`);
    console.log(data);
    tk+=`
    <table class='axtblmin'>
    <thead>
        <tr>
            <td>PLACA</td>
            <td>CHASIS</td>
            <td>DUEÑO</td>
        </tr>
    </thead>
    <tbody>`;
        for(p=0;p<data.list.length;p++){
        tk+=`
        <tr> 
            <td>${data.list[p].placa}</td> 
            <td>${data.list[p].chas}</td> 
            <td>${data.list[p].nom} ${data.list[p].ap}</td> 
        </tr>`;
    }
    tk+=`
    </tbody>
    </table>`;
    axload('c2',tk);
}




















/*function prodfrm() {
    let Tk=`
    <form id='f1'>
        <input name='nomp' placeholder='NOMBRE DE PRODUCTO'>
        <input name='prec' placeholder='PRECIO' type='number'>
        <textarea name='des' placeholder='DESCRIPCION'></textarea>
        <select name='categ'>
            <option>ELECTRONICA</option>
            <option>MUEBLE</option>
            <option>COMIDA</option>
            <option>ROPA</option>
            <option>OTRO</option>
        </select><br>
        <button>GUARDAR</button>
    </form>`;
    document.getElementById('c1').innerHTML=Tk;

    document.getElementById('f1').addEventListener('submit',e=>{
        e.preventDefault();
        FD=new FormData(document.getElementById('f1'));
        fetch(`api/prodsave`,{method:"POST",body:FD})
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data);
        })
        .catch(err=>{alert(err);})
    })
}
function prodlist(busq){
    if(busq== undefined){busq='';}  
    fetch(`api/prodlist/${busq}`)
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data);
        let TK=`
        <h1>LISTA DE PRODUCTOS</h1>
        <form id='f2'>
            <input id='busq' value='${busq}'>
            <button type='button' onclick='prodlist(busq.value)'>BUSCAR</button>
        </form>
        <table class="table table-striped table-hover table-bordered">
        <thead>
            <tr class="table-primary">
            <th>#</th>
            <th>NOMBRE</th>
            <th>PRECIO</th>
            <th>ACCION</th>
            </tr>
        </thead>
        <tbody>`;
        
        for(p=0;p<data.list.length;p++){

            TK+=`
            <tr id="prod${data.list[p].nump}">
            <th>${p+1}</th>
            <th>${data.list[p].nomp}</th>
            <th>${data.list[p].prec}</th>
            <th><button class='btn btn-primary' onclick='prodel(${data.list[p].nump})'>ELIMINAR</button></th>
            <th><button class='btn btn-danger' onclick='proedit(${data.list[p].nump})'>EDITAR</button></th>
            </tr>`;
        }
        TK+=`
        </tbody>
        </table>`
        document.getElementById('c1').innerHTML=TK;
    })
}
function prodel(nump){
if(confirm("ESTA SEGURO DE ELIMINAR??")){
    fetch(`api/prodel/${nump}`)
    .then(resp=>resp.json())
    .then(data=>{console.log(data);
    document.getElementById(`prod${nump}`).style.display='none';})
}

}
function userlist(){
    fetch(`api/userlist`)
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data);
        let TK=`
        <h1>LISTA DE USUARIO</h1>
        <table class="table table-striped table-hover table-bordered">
        <thead>
            <tr class="table-primary">
            <th>#</th>
            <th>NOMBRE</th>
            <th>APELLIDO</th>
            <th>ACCION</th>
            </tr>
        </thead>
        <tbody>`;
        for(p=0;p<data.list.length;p++){
            TK+=`
            <tr>
            <td>${p+1}</td>
            <td>${data.list[p].nom}</td>
            <td>${data.list[p].app}</td>
            <td><button class='btn btn-primary' onclick='userdel(${data.list[p].num})'>ELIMINAR</button></td>
            </tr>`;
            
        }
        TK+=`
        </tbody>
        </table>`
        document.getElementById('c1').innerHTML=TK;
    })
}
function userdel(num){
    if(confirm("ESTA SEGURO DE ELIMINAR??")){
        fetch(`api/userdel/${num}`)
        .then(resp=>resp.json())
        .then(data=>{console.log(data);
        document.getElementById(`user${num}`).style.display='none';})
    }
}
function proedit(nump) {
    fetch(`api/prodinfo/${nump}`)
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data);
    let Tk=`
    <form id='f1'>
        <input name='nump' value='${nump}'>
        <input name='nomp' type="text" placeholder='NOMBRE DE PRODUCTO' value="${data.nomp}">
        <input name='prec' placeholder='PRECIO' type='number' value="${data.prec}">
        <textarea name='des' class='form-control' aria-label='Descripcion' >${data.des}</textarea>
        <select name='categ'>
            <option ${data.categ=='ELECTRONICA'?'selected':''}>ELECTRONICA</option>
            <option ${data.categ=='MUEBLE'?'selected':''}>MUEBLE</option>
            <option ${data.categ=='COMIDA'?'selected':''}>COMIDA</option>
            <option ${data.categ=='ROPA'?'selected':''}>ROPA</option>
            <option ${data.categ=='OTRO'?'selected':''}>OTRO</option>
        </select>
        <button>ACTUALIZAR</button>
    </form>`;
    document.getElementById('c1').innerHTML=Tk;

    document.getElementById('f1').addEventListener('submit',e=>{
        e.preventDefault();
        FD=new FormData(document.getElementById('f1'));
        fetch(`api/produp`,{method:"POST",body:FD})
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data);
        })
        .catch(err=>{alert(err);})
    })
    })    
}*/