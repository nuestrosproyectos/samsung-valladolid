/* Reparación Samsung Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '641 153 922', TEL_HREF: 'tel:+34641153922',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=',
    MARCA: 'Samsung', MARCA_RE: /\b(SAMSUNG)\b/g, SAT_TXT: '<a href="https://www.samsung.com/es/support/" rel="nofollow noopener" target="_blank">samsung.com/es/support</a> · 911 75 00 15', ETIQUETA: 'código de modelo', F_ES_E: false,
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"4c-lavadora","cod":"4C / 4E","ap":"lavadora","keys":["4C","4E"],"titulo":"No entra agua","sig":"La lavadora no recibe agua o entra demasiado despacio (4E en modelos anteriores a 2015: es la misma avería).","pasos":["Abrir el grifo del todo y estirar la manguera de entrada, sin dobleces","Desenchufar, cerrar el grifo, soltar la manguera y limpiar los filtros de malla de entrada","Limpiar la cubeta del detergente"],"sem":"verde","llamar":"Con presión de agua y filtros limpios sigue igual → electroválvula de entrada o presostato."},{"id":"5c-lavadora","cod":"5C / 5E","ap":"lavadora","keys":["5C","5E","SC","SE"],"titulo":"No desagua","sig":"La lavadora no vacía el agua (5E, SC o SE en modelos anteriores: es el mismo aviso).","pasos":["Desenchufar y vaciar por el tubito de desagüe de emergencia de la tapa inferior","Limpiar el filtro de la bomba: monedas, horquillas, pelusa","Comprobar que la manguera de desagüe no está doblada ni por encima de 1 m"],"sem":"verde","llamar":"Filtro limpio, manguera bien y sigue igual → bomba de desagüe o su cableado."},{"id":"ue-lavadora","cod":"UE / Ub","ap":"lavadora","keys":["UE","UB","U6","UR"],"titulo":"No centrifuga: carga desequilibrada","sig":"La ropa se ha amontonado a un lado y la lavadora no centrifuga por seguridad (Ub en las nuevas, UE en las anteriores).","pasos":["Repartir la ropa en el tambor; no lavar una sola toalla o un edredón solo","Nivelar las patas para que no cojee","Limpiar el filtro de la bomba y volver a centrifugar"],"sem":"verde","llamar":"Se repite con cualquier carga → amortiguadores o rodamientos del tambor."},{"id":"dc-lavadora","cod":"dC / dE","ap":"lavadora","keys":["DC","DE","DC1","DC3","DDC"],"titulo":"Puerta abierta o mal cerrada","sig":"El cierre no detecta la puerta bien cerrada (dE en modelos anteriores; dC1 y dC3, la portezuela AddWash; ddC, has abierto AddWash sin pulsar Pausa).","pasos":["Cerrar la puerta con firmeza y sacar la ropa atrapada en la goma","Con AddWash: cerrar bien también la portezuela pequeña","Si marca ddC: pulsar Pausa, cerrar AddWash y reanudar"],"sem":"verde","llamar":"Puerta bien cerrada y sigue → bloqueo eléctrico de la puerta."},{"id":"lc-lavadora","cod":"LC / LE","ap":"lavadora","keys":["LC","LE","LC1"],"titulo":"Fuga o manguera de desagüe baja","sig":"Hay agua fuera de la cuba, o la manguera de desagüe está tan baja que el agua se va sola (sifonado).","pasos":["Mirar si hay agua bajo la lavadora; si la hay, cerrar el grifo y desenchufar","Colocar la manguera de desagüe a 60–90 cm de altura, sin forzarla"],"sem":"ambar","llamar":"Con agua en el suelo, siempre: junta de la puerta, manguera interna o bomba."},{"id":"hc-lavadora","cod":"HC / HE","ap":"lavadora","keys":["HC","HE"],"titulo":"Fallo de calentamiento","sig":"La lavadora no calienta el agua o detecta una temperatura demasiado alta.","pasos":[],"sem":"ambar","llamar":"Siempre: resistencia o sonda de temperatura."},{"id":"3c-lavadora","cod":"3C / 3E","ap":"lavadora","keys":["3C","3E","3CP"],"titulo":"Motor no gira","sig":"Fallo del motor o de su sensor de giro (tacómetro).","pasos":["Sacar parte de la ropa si el tambor va muy cargado","Desenchufar un minuto y reiniciar una sola vez"],"sem":"ambar","llamar":"Persiste → motor, sensor Hall o placa inverter."},{"id":"tc-lavadora","cod":"tC / tE","ap":"lavadora","keys":["TC","TE"],"titulo":"Sensor de temperatura","sig":"La sonda NTC que mide la temperatura del agua da una lectura imposible.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"oc-lavadora","cod":"OC / OE","ap":"lavadora","keys":["OC","OE","OF"],"titulo":"Rebose de agua","sig":"Ha entrado más agua de la cuenta: el nivel supera el máximo permitido.","pasos":["Apagar y desenchufar","Cerrar el grifo si sigue entrando agua"],"sem":"ambar","llamar":"Siempre después: presostato o electroválvula que no cierra."},{"id":"1c-lavadora","cod":"1C / 1E","ap":"lavadora","keys":["1C","1E","IE"],"titulo":"Sensor de nivel de agua","sig":"El presostato que mide el nivel de agua falla.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"ac-lavadora","cod":"AC / AE","ap":"lavadora","keys":["AC","AE","AC6"],"titulo":"Comunicación entre placas","sig":"La placa de mandos y la placa de potencia no se entienden.","pasos":["Desenchufar un minuto y volver a encender"],"sem":"ambar","llamar":"Se repite → placa principal o módulo inverter."},{"id":"9c-lavadora","cod":"9C / UC","ap":"lavadora","keys":["9C","UC"],"titulo":"Tensión de red anormal","sig":"La lavadora recibe una tensión demasiado baja o demasiado alta.","pasos":["Enchufarla directamente a la pared, sin regletas ni alargadores","Probar en otro enchufe de la casa"],"sem":"verde","llamar":"En un enchufe correcto se repite → placa de potencia."},{"id":"4c-lavasecadora","cod":"4C / 4E","ap":"lavasecadora","keys":["4C","4E"],"titulo":"No entra agua","sig":"La lavasecadora no recibe agua o entra demasiado despacio (4E en modelos anteriores a 2015: es la misma avería).","pasos":["Abrir el grifo del todo y estirar la manguera de entrada, sin dobleces","Desenchufar, cerrar el grifo, soltar la manguera y limpiar los filtros de malla de entrada","Limpiar la cubeta del detergente"],"sem":"verde","llamar":"Con presión de agua y filtros limpios sigue igual → electroválvula de entrada o presostato."},{"id":"5c-lavasecadora","cod":"5C / 5E","ap":"lavasecadora","keys":["5C","5E","SC","SE"],"titulo":"No desagua","sig":"La lavasecadora no vacía el agua (5E, SC o SE en modelos anteriores: es el mismo aviso).","pasos":["Desenchufar y vaciar por el tubito de desagüe de emergencia de la tapa inferior","Limpiar el filtro de la bomba: monedas, horquillas, pelusa","Comprobar que la manguera de desagüe no está doblada ni por encima de 1 m"],"sem":"verde","llamar":"Filtro limpio, manguera bien y sigue igual → bomba de desagüe o su cableado."},{"id":"ue-lavasecadora","cod":"UE / Ub","ap":"lavasecadora","keys":["UE","UB","U6","UR"],"titulo":"No centrifuga: carga desequilibrada","sig":"La ropa se ha amontonado a un lado y la lavasecadora no centrifuga por seguridad (Ub en las nuevas, UE en las anteriores).","pasos":["Repartir la ropa en el tambor; no lavar una sola toalla o un edredón solo","Nivelar las patas para que no cojee","Limpiar el filtro de la bomba y volver a centrifugar"],"sem":"verde","llamar":"Se repite con cualquier carga → amortiguadores o rodamientos del tambor."},{"id":"dc-lavasecadora","cod":"dC / dE","ap":"lavasecadora","keys":["DC","DE","DC1","DC3","DDC"],"titulo":"Puerta abierta o mal cerrada","sig":"El cierre no detecta la puerta bien cerrada (dE en modelos anteriores; dC1 y dC3, la portezuela AddWash; ddC, has abierto AddWash sin pulsar Pausa).","pasos":["Cerrar la puerta con firmeza y sacar la ropa atrapada en la goma","Con AddWash: cerrar bien también la portezuela pequeña","Si marca ddC: pulsar Pausa, cerrar AddWash y reanudar"],"sem":"verde","llamar":"Puerta bien cerrada y sigue → bloqueo eléctrico de la puerta."},{"id":"lc-lavasecadora","cod":"LC / LE","ap":"lavasecadora","keys":["LC","LE","LC1"],"titulo":"Fuga o manguera de desagüe baja","sig":"Hay agua fuera de la cuba, o la manguera de desagüe está tan baja que el agua se va sola (sifonado).","pasos":["Mirar si hay agua bajo la lavasecadora; si la hay, cerrar el grifo y desenchufar","Colocar la manguera de desagüe a 60–90 cm de altura, sin forzarla"],"sem":"ambar","llamar":"Con agua en el suelo, siempre: junta de la puerta, manguera interna o bomba."},{"id":"hc-lavasecadora","cod":"HC / HE","ap":"lavasecadora","keys":["HC","HE"],"titulo":"Fallo de calentamiento","sig":"La lavasecadora no calienta el agua o detecta una temperatura demasiado alta.","pasos":[],"sem":"ambar","llamar":"Siempre: resistencia o sonda de temperatura."},{"id":"3c-lavasecadora","cod":"3C / 3E","ap":"lavasecadora","keys":["3C","3E","3CP"],"titulo":"Motor no gira","sig":"Fallo del motor o de su sensor de giro (tacómetro).","pasos":["Sacar parte de la ropa si el tambor va muy cargado","Desenchufar un minuto y reiniciar una sola vez"],"sem":"ambar","llamar":"Persiste → motor, sensor Hall o placa inverter."},{"id":"tc-lavasecadora","cod":"tC / tE","ap":"lavasecadora","keys":["TC","TE"],"titulo":"Sensor de temperatura","sig":"La sonda NTC que mide la temperatura del agua da una lectura imposible.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"oc-lavasecadora","cod":"OC / OE","ap":"lavasecadora","keys":["OC","OE","OF"],"titulo":"Rebose de agua","sig":"Ha entrado más agua de la cuenta: el nivel supera el máximo permitido.","pasos":["Apagar y desenchufar","Cerrar el grifo si sigue entrando agua"],"sem":"ambar","llamar":"Siempre después: presostato o electroválvula que no cierra."},{"id":"1c-lavasecadora","cod":"1C / 1E","ap":"lavasecadora","keys":["1C","1E","IE"],"titulo":"Sensor de nivel de agua","sig":"El presostato que mide el nivel de agua falla.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"ac-lavasecadora","cod":"AC / AE","ap":"lavasecadora","keys":["AC","AE","AC6"],"titulo":"Comunicación entre placas","sig":"La placa de mandos y la placa de potencia no se entienden.","pasos":["Desenchufar un minuto y volver a encender"],"sem":"ambar","llamar":"Se repite → placa principal o módulo inverter."},{"id":"9c-lavasecadora","cod":"9C / UC","ap":"lavasecadora","keys":["9C","UC"],"titulo":"Tensión de red anormal","sig":"La lavasecadora recibe una tensión demasiado baja o demasiado alta.","pasos":["Enchufarla directamente a la pared, sin regletas ni alargadores","Probar en otro enchufe de la casa"],"sem":"verde","llamar":"En un enchufe correcto se repite → placa de potencia."},{"id":"dc-secadora","cod":"dC / dE","ap":"secadora","keys":["DC","DE","DF"],"titulo":"Puerta abierta","sig":"La secadora no detecta la puerta cerrada (dE en modelos anteriores; dF: el interruptor de la puerta falla).","pasos":["Cerrar la puerta hasta oír el clic y sacar la ropa atrapada","Comprobar que no está activo el bloqueo infantil"],"sem":"verde","llamar":"Puerta bien cerrada y sigue, o marca dF → micro de la puerta."},{"id":"5c-secadora","cod":"5C / 5E","ap":"secadora","keys":["5C","5E"],"titulo":"Depósito lleno o no drena","sig":"El agua de condensación no se evacúa: depósito lleno, manguera doblada o hielo en el circuito.","pasos":["Vaciar el depósito de agua","Si desagua directo: manguera sin dobleces ni por encima de 1 m","Con frío intenso, dejar que se descongele antes de volver a probar"],"sem":"verde","llamar":"Depósito vacío y sigue → bomba de condensados."},{"id":"tc-secadora","cod":"tC / tE","ap":"secadora","keys":["TC","TE"],"titulo":"Sensor de temperatura del aire","sig":"La sonda que mide el aire de secado da una lectura errónea, muchas veces por filtros sucios.","pasos":["Limpiar el filtro de pelusas y el intercambiador (tapa inferior)","Dejar libre la ventilación alrededor de la secadora"],"sem":"ambar","llamar":"Limpio y sigue → sonda o placa."},{"id":"tc5-secadora","cod":"tC5 / tE5","ap":"secadora","keys":["TC5","TE5"],"titulo":"Sensor del compresor","sig":"El sensor de temperatura del compresor de la bomba de calor da un valor fuera de rango.","pasos":["Esperar 2–3 minutos y reiniciar","Limpiar el filtro de pelusas"],"sem":"ambar","llamar":"Persiste → sensor o compresor."},{"id":"hc-secadora","cod":"HC / HE","ap":"secadora","keys":["HC","HE"],"titulo":"Compresor sobrecalentado","sig":"La bomba de calor se calienta más de la cuenta: casi siempre falta paso de aire.","pasos":["Limpiar el filtro de pelusas y el intercambiador","No tapar las rejillas ni compartir regleta con otros aparatos"],"sem":"ambar","llamar":"Persiste → compresor o ventilador."},{"id":"3c-secadora","cod":"3C / 3E","ap":"secadora","keys":["3C","3E"],"titulo":"Motor","sig":"El motor inverter del tambor no gira o gira mal.","pasos":["Desenchufar un minuto y reiniciar una sola vez"],"sem":"ambar","llamar":"Persiste → motor o placa inverter."},{"id":"ac-secadora","cod":"AC / AC6","ap":"secadora","keys":["AC","AC6"],"titulo":"Electrónica / comunicación","sig":"Las placas de la secadora no se comunican entre sí.","pasos":["Desenchufar un minuto y volver a encender"],"sem":"ambar","llamar":"Persiste → placa."},{"id":"9c1-secadora","cod":"9C1 / 9C2 / FC","ap":"secadora","keys":["9C1","9C2","FC","9C"],"titulo":"Tensión o frecuencia de red","sig":"La secadora recibe una tensión o una frecuencia fuera de lo normal.","pasos":["Enchufar directo a la pared, sin alargadores","Probar en otro enchufe"],"sem":"verde","llamar":"En un enchufe correcto se repite → placa."},{"id":"4c-lavavajillas","cod":"4C / 4E","ap":"lavavajillas","keys":["4C","4E","4C5"],"titulo":"No entra agua","sig":"El lavavajillas no recibe agua o no llena del todo (4E en modelos anteriores).","pasos":["Abrir el grifo del todo","Manguera de entrada sin dobleces","Comprobar que hay presión de agua en el grifo de la cocina"],"sem":"verde","llamar":"Con agua y presión sigue igual → electroválvula."},{"id":"5c-lavavajillas","cod":"5C / 5E","ap":"lavavajillas","keys":["5C","5E","5C2"],"titulo":"No desagua","sig":"El agua se queda en la cuba (5C2 apunta a la bomba de desagüe).","pasos":["Limpiar el filtro de malla y el sumidero: cristales y restos de comida","Manguera de desagüe sin dobleces","Revisar que el sifón del fregadero no está atascado"],"sem":"verde","llamar":"Todo limpio y sigue → bomba de desagüe."},{"id":"lc-lavavajillas","cod":"LC / LE","ap":"lavavajillas","keys":["LC","LE"],"titulo":"Fuga detectada","sig":"El sensor de la bandeja inferior ha detectado agua.","pasos":["Usar solo detergente de lavavajillas, nunca de fregar a mano","Revisar la junta de la puerta y el filtro; nivelar el aparato","Con agua en el suelo: cerrar el grifo y desenchufar"],"sem":"ambar","llamar":"Reaparece → junta de la puerta, bomba o cuba."},{"id":"hc-lavavajillas","cod":"HC / HE","ap":"lavavajillas","keys":["HC","HE","HC1","HC2","HC4"],"titulo":"Temperatura alta / secado","sig":"El agua se ha calentado demasiado o falla el secado.","pasos":["Desenchufar 5 minutos","Conectarlo a la toma de agua fría, no a la caliente","Limpiar los filtros y dejar libre la salida de vapor"],"sem":"ambar","llamar":"Persiste → resistencia, sonda o ventilador de secado."},{"id":"oc-lavavajillas","cod":"OC","ap":"lavavajillas","keys":["OC","OE"],"titulo":"Exceso de espuma / parada","sig":"Demasiada espuma en la cuba o el programa se detiene a mitad.","pasos":["Usar el detergente adecuado en la dosis correcta","Limpiar los filtros","Hacer un ciclo en vacío"],"sem":"verde","llamar":"Persiste sin detergente → sensor o bomba."},{"id":"pc-lavavajillas","cod":"PC / PE","ap":"lavavajillas","keys":["PC","PE"],"titulo":"Fallo de zona o media carga","sig":"La función de lavado por zonas o de media carga no responde.","pasos":["Desactivar las opciones y lanzar un programa Normal"],"sem":"verde","llamar":"Persiste → placa."},{"id":"3c-lavavajillas","cod":"3C / 3E","ap":"lavavajillas","keys":["3C","3E"],"titulo":"No arranca el lavado","sig":"La bomba de recirculación no se pone en marcha.","pasos":["Apagar un minuto y reiniciar"],"sem":"ambar","llamar":"Persiste → bomba de recirculación."},{"id":"6c-lavavajillas","cod":"6C / bE","ap":"lavavajillas","keys":["6C","BE","BC2"],"titulo":"Botón pulsado permanentemente","sig":"El panel detecta una tecla apretada sin soltar.","pasos":["Comprobar que ningún botón se ha quedado hundido","Limpiar y secar el panel táctil"],"sem":"verde","llamar":"Persiste → teclado."},{"id":"9c1-lavavajillas","cod":"9C1 / UC","ap":"lavavajillas","keys":["9C1","9C2","UC","9C"],"titulo":"Tensión anormal / corte","sig":"El lavavajillas recibe una tensión fuera de rango o se ha cortado a mitad de programa.","pasos":["Enchufe propio, sin alargadores ni regletas"],"sem":"verde","llamar":"Persiste → placa."},{"id":"ac-lavavajillas","cod":"AC / tC","ap":"lavavajillas","keys":["AC","AC6","TC","TE"],"titulo":"Electrónica / bloqueo","sig":"Fallo de comunicación entre placas o bloqueo del control: no arranca.","pasos":["Desenchufar 5–10 minutos y volver a probar"],"sem":"ambar","llamar":"Persiste → placa."},{"id":"ofof-frigorifico","cod":"OF OF","ap":"frigorifico","keys":["OFOF","OFF","OF"],"titulo":"Modo tienda: luz sí, frío no","sig":"El frigorífico está en modo demostración: enciende la luz y la pantalla, pero no enfría.","pasos":["Mantener pulsados Freezer y Alarm (los dos primeros botones) hasta el pitido","Si no cambia: Freezer, Alarm y Fridge a la vez unos segundos"],"sem":"verde","llamar":"No sale del modo tienda → placa de mandos."},{"id":"8888-frigorifico","cod":"88 88 / 83E / 85E / 86E","ap":"frigorifico","keys":["8888","E8888","88","E88","83E","85E","86E"],"titulo":"Tensión de red / compresor","sig":"Sobretensión o subtensión de red, o fallo de arranque del compresor.","pasos":["Desenchufar 60 segundos y volver a conectar","Enchufe propio, sin alargadores"],"sem":"ambar","llamar":"Se repite → placa inverter o compresor."},{"id":"pcer-frigorifico","cod":"PC ER / PC CH","ap":"frigorifico","keys":["PCER","PCCH","PC"],"titulo":"Comunicación panel–placa","sig":"La pantalla y la placa principal han perdido la comunicación.","pasos":["Desenchufar 60 segundos"],"sem":"ambar","llamar":"Persiste → cableado o display."},{"id":"22e-frigorifico","cod":"22E / 22C","ap":"frigorifico","keys":["22E","22C"],"titulo":"Ventilador bloqueado por hielo","sig":"El ventilador del frigorífico no gira: casi siempre hay hielo en el evaporador (el congelador enfría y el frigorífico no).","pasos":["Desenchufar 8 horas con las puertas abiertas para descongelar del todo (toallas debajo)","Volver a enchufar y dejar un día entero para que coja temperatura"],"sem":"verde","llamar":"Vuelve a salir a los pocos días → motor del ventilador o sistema de desescarche."},{"id":"5e-frigorifico","cod":"5E / 5C","ap":"frigorifico","keys":["5E","5C"],"titulo":"Sensor de desescarche","sig":"El sensor que controla la descongelación del frigorífico falla (en frigorífico no es el desagüe: es un sensor).","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"1e-frigorifico","cod":"1E / 4E / 6E","ap":"frigorifico","keys":["1E","4E","6E"],"titulo":"Sensores de temperatura","sig":"Sensor de temperatura del congelador (1E), de desescarche (4E) o ambiente (6E).","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"8e-frigorifico","cod":"8E / 14E / 39E / 40E","ap":"frigorifico","keys":["8E","14E","33E","39E","40E"],"titulo":"Fabricador de hielo","sig":"Sensor, ventilador o calentador del fabricador de hielo, o la propia función de hielo.","pasos":["Comprobar que la cubeta de hielo está bien encajada (si parpadea Ice Off, no lo está)","Llenar el depósito de agua en los modelos sin toma"],"sem":"ambar","llamar":"Persiste → módulo del fabricador de hielo."},{"id":"41c-frigorifico","cod":"41C / 41–42","ap":"frigorifico","keys":["41C","E41","E42"],"titulo":"Reinicio de software (Family Hub)","sig":"El frigorífico con pantalla Family Hub o de 3 puertas pide reiniciar o actualizar el software (41 o 42 luces azules).","pasos":["Actualizar desde la pantalla o reiniciar con el interruptor interior"],"sem":"ambar","llamar":"Persiste → placa o pantalla."},{"id":"84c-frigorifico","cod":"84C / 85C","ap":"frigorifico","keys":["84C","85C"],"titulo":"Compresor inverter","sig":"El compresor está bloqueado o no se comunica con la placa.","pasos":[],"sem":"ambar","llamar":"Siempre. Es la pieza con garantía de Samsung de 20 o 10 años según la fecha de compra: mírala antes de nada."},{"id":"cf-aire","cod":"CF","ap":"aire-acondicionado","keys":["CF"],"titulo":"Aviso de limpieza de filtro","sig":"No es una avería: el equipo pide limpiar los filtros.","pasos":["Limpiar los filtros de la unidad interior (cada dos semanas si se usa mucho)","Reiniciar el aviso desde el mando"],"sem":"verde","llamar":"Nunca por esto.","aviso":1},{"id":"cl-aire","cod":"Cl","ap":"aire-acondicionado","keys":["CL"],"titulo":"Autolimpieza en marcha","sig":"El equipo está secando el intercambiador tras apagarse (Auto Clean); no es un error.","pasos":["Esperar a que termine; se puede desactivar desde el mando"],"sem":"verde","llamar":"Nunca.","aviso":1},{"id":"df-aire","cod":"dF","ap":"aire-acondicionado","keys":["DF"],"titulo":"Desescarche automático","sig":"En calefacción, la unidad exterior se descongela sola; es normal con frío y humedad.","pasos":["Esperar: en unos minutos vuelve a calentar"],"sem":"verde","llamar":"Si dura más de un cuarto de hora y se repite sin parar.","aviso":1},{"id":"e101-aire","cod":"E101 / E102 / E556","ap":"aire-acondicionado","keys":["E101","E102","E556"],"titulo":"Comunicación interior–exterior","sig":"Las unidades interior y exterior no se comunican.","pasos":["Bajar el magnetotérmico del aire 2 minutos y volver a subirlo"],"sem":"ambar","llamar":"Persiste → cableado entre unidades o placa."},{"id":"e121-aire","cod":"E121 / E122 / E123","ap":"aire-acondicionado","keys":["E121","E122","E123"],"titulo":"Sensores de la unidad interior","sig":"Sensor de temperatura ambiente o del intercambiador de la unidad interior.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e154-aire","cod":"E154","ap":"aire-acondicionado","keys":["E154"],"titulo":"Ventilador de la unidad interior","sig":"El ventilador interior no gira o gira mal.","pasos":[],"sem":"ambar","llamar":"Siempre; no metas nada por la rejilla."},{"id":"e162-aire","cod":"E162 / E163","ap":"aire-acondicionado","keys":["E162","E163"],"titulo":"Memoria / opciones de la placa","sig":"Error de EEPROM o de configuración de la placa interior.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e221-aire","cod":"E221 / E251","ap":"aire-acondicionado","keys":["E221","E251"],"titulo":"Sensores de la unidad exterior","sig":"Sensor de temperatura del aire exterior (E221) o de descarga del compresor (E251).","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e458-aire","cod":"E458","ap":"aire-acondicionado","keys":["E458"],"titulo":"Ventilador de la unidad exterior","sig":"El ventilador de la unidad exterior no gira.","pasos":["Mirar, sin tocarla, si algo bloquea la unidad exterior: bolsas, hojas, nidos"],"sem":"ambar","llamar":"Siempre, después de mirar."},{"id":"e461-aire","cod":"E461 / E464 / E466","ap":"aire-acondicionado","keys":["E461","E464","E466"],"titulo":"Compresor: arranque, corriente, tensión","sig":"Fallo de arranque del compresor, sobrecorriente del módulo IPM o tensión del bus DC.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e554-aire","cod":"E554","ap":"aire-acondicionado","keys":["E554"],"titulo":"Fuga de refrigerante","sig":"El equipo detecta falta de gas.","pasos":[],"sem":"ambar","llamar":"Siempre: apágalo y no lo manipules; la carga de gas la hace solo una empresa habilitada (RD 115/2017)."}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"lavasecadora":{"id":"lavasecadora","nombre":"Lavasecadora","art":"una lavasecadora","slug":"lavasecadora"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"congelador":{"id":"congelador","nombre":"Congelador","art":"un congelador","slug":"congelador"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"},"campana":{"id":"campana","nombre":"Campana extractora","art":"una campana","slug":"campana"},"aire-acondicionado":{"id":"aire-acondicionado","nombre":"Aire acondicionado","art":"un aire acondicionado","slug":"aire-acondicionado"}};
  var REL = document.documentElement.getAttribute('data-rel') || '';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var wa = function (t) { return CONFIG.WA_BASE + encodeURIComponent(t); };
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zona (memoria de sesión) */
  var Z = {
    get: function () { try { return sessionStorage.getItem('zona') || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? sessionStorage.setItem('zona', v) : sessionStorage.removeItem('zona'); } catch (e) { } }
  };
  if (document.body.getAttribute('data-zona')) Z.set(document.body.getAttribute('data-zona'));
  var zonaTxt = function () { return Z.get() || '[tu barrio o municipio]'; };

  /* ---------- horario */
  function abierto() {
    var d = new Date(), h = d.getHours() + d.getMinutes() / 60, w = d.getDay();
    if (w >= 1 && w <= 5) return h >= 8 && h < 20;
    if (w === 6) return h >= 9 && h < 14;
    return false;
  }
  if (!abierto()) $$('[data-chip-hora]').forEach(function (el) { el.textContent = 'Te llamamos a primera hora (L–V desde las 8)'; });

  /* ---------- barra inferior: solo cuando los CTA del hero no se ven */
  var barra = $('.barra');
  if (barra) {
    var heroCta = $('[data-hero-cta]');
    var setBarra = function (on) { barra.classList.toggle('on', on); document.body.classList.toggle('barra-on', on); };
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setBarra(!es[0].isIntersecting && es[0].boundingClientRect.top < 0 || (!es[0].isIntersecting && window.scrollY > 300)); }, { threshold: 0.2 }).observe(heroCta);
    } else setBarra(true);
  }

  /* ---------- modal de llamada en escritorio */
  var esEscritorio = window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;
  var modal = $('#modal-tel');
  if (modal && esEscritorio) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault(); modal.classList.add('on'); $('.cerrar', modal).focus();
    });
    $('.cerrar', modal).addEventListener('click', function () { modal.classList.remove('on'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('on'); });
    var cp = $('[data-copiar]', modal);
    if (cp) cp.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText('641153922').then(function () { cp.textContent = 'Copiado: 641 153 922'; });
    });
  }

  /* ---------- vídeo del hero: solo 4G, en viewport, sin reduced-motion ni ahorro de datos */
  var v = $('video[data-src]');
  if (v) {
    var c = navigator.connection || {};
    var okRed = !c.saveData && (!c.effectiveType || c.effectiveType === '4g');
    if (window.innerWidth < 900 && v.getAttribute('data-src-m')) v.setAttribute('data-src', v.getAttribute('data-src-m'));
    if (okRed && !reduced && 'IntersectionObserver' in window) {
      var cargado = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!cargado) { cargado = true; v.src = v.getAttribute('data-src'); v.load(); v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true }); }
          v.play().catch(function () { });
        } else if (cargado) v.pause();
      }, { threshold: 0.1 }).observe(v);
    }
  }

  /* ---------- reveals */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ---------- síntomas (subpáginas) */
  $$('.sint-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.nextElementSibling, on = b.getAttribute('aria-expanded') === 'true';
      $$('.sint-b', b.closest('.sint')).forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.classList.remove('on'); });
      if (!on) { b.setAttribute('aria-expanded', 'true'); p.classList.add('on'); }
    });
  });
  /* WhatsApp con zona en enlaces marcados */
  $$('a[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); });
    a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt()));
  });

  /* ================================================================ BUSCADOR */
  var APW = { lavasecadora: ['LAVASECADORA', 'LAVASECADORAS'], lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], congelador: ['CONGELADOR', 'CONGELADORES', 'ARCON'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'AMERICANO', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], campana: ['CAMPANA', 'EXTRACTORA'], caldera: ['CALDERA', 'CONDENS', 'CALEFACCION'], calentador: ['CALENTADOR', 'TERMO', 'THERM'], 'aire-acondicionado': ['AIRE', 'ACONDICIONADO', 'SPLIT', 'CLIMA', 'CLIMATIZACION', 'CLIMATE'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    var sinRelleno = up.replace(/\b(ERROR|CODIGO|CODE|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    if (sinRelleno.trim()) up = sinRelleno; /* si la consulta es solo «dE» (código de puerta en LG), no se vacía */
    if (CONFIG.MARCA_RE) up = up.replace(CONFIG.MARCA_RE, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    if (/^\d+$/.test(k)) k = 'E' + k;
    var alt = CONFIG.F_ES_E && /^F\d/.test(k) ? k.replace(/^F/, 'E') : null;
    return { key: k, alt: alt, ap: ap, fIn: !!alt };
  }
  function buscar1(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function buscar(key, ap, prefijo, alt) {
    var r = buscar1(key, ap, prefijo);
    if (!r.length && alt) r = buscar1(alt, ap, prefijo);
    return r;
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' ' + CONFIG.MARCA + ' que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' <span class="marca">' + esc(CONFIG.MARCA) + '</span></span></div>';
    h += '<p class="ficha-t">' + esc(c.titulo) + '</p><p class="ficha-s">' + esc(c.sig) + '</p>';
    h += '<span class="sem sem-' + c.sem + '">' + semTxt(c) + '</span>';
    if (c.pasos.length) {
      h += '<ul class="chk" aria-label="Autocomprobación">' + c.pasos.map(function (p, i) { return '<li><label><input type="checkbox" data-paso="' + i + '"><span>' + esc(p) + '</span></label></li>'; }).join('') + '</ul>';
      h += '<div class="sigue" role="group" aria-label="Resultado"><p>¿Sigue marcando ' + esc(codigo) + '?</p><div class="g"><button type="button" class="si">Sí, sigue igual</button><button type="button" class="no">Se ha arreglado</button></div></div>';
    }
    h += '<div class="llamar-c' + (c.pasos.length ? '' : ' on') + '"><b>Cuándo llamar</b>' + esc(c.llamar) + '</div>';
    h += '<div class="ok-c">Nos alegramos. Si vuelve a marcarlo, aquí estamos. <a class="link" href="' + REL + a.slug + '/">Cómo cuidar tu ' + esc(a.nombre.toLowerCase()) + ' →</a></div>';
    h += '<div class="ficha-cta"><a class="btn btn-wa" data-cta-wa href="' + wa(textoWA(c, [])) + '" target="_blank" rel="noopener">' + ico('wa') + 'WhatsApp con el código</a>';
    h += '<a class="btn btn-amber" data-cta-tel href="' + CONFIG.TEL_HREF + '">' + ico('tel') + 'Llamar · ' + CONFIG.TEL + '</a></div>';
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' ' + esc(CONFIG.MARCA) + ' →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: ' + CONFIG.SAT_TXT + '</p>';
    return h + '</article>';
  }
  function bindFicha(el) {
    var id = el.getAttribute('data-id'), c = CODIGOS.filter(function (x) { return x.id === id; })[0];
    if (!c || el.__b) return; el.__b = true;
    var chk = $$('input[type=checkbox]', el), sigue = $('.sigue', el), llamar = $('.llamar-c', el), ok = $('.ok-c', el);
    var bWa = $('[data-cta-wa]', el), bTel = $('[data-cta-tel]', el);
    var codigo = c.cod.split('/')[0].trim();
    var pasos = function () { return chk.filter(function (i) { return i.checked; }).map(function (i) { return i.nextElementSibling.textContent; }); };
    var refresca = function () { bWa.href = wa(textoWA(c, pasos())); };
    chk.forEach(function (i) {
      i.addEventListener('change', function () {
        refresca();
        if (chk.every(function (x) { return x.checked; })) { sigue.classList.add('on'); } else { sigue.classList.remove('on'); }
      });
    });
    if (sigue) {
      $('.si', sigue).addEventListener('click', function () {
        llamar.classList.add('on'); ok.classList.remove('on'); el.classList.add('hot'); refresca();
        bTel.innerHTML = ico('tel') + 'Que me llame un técnico · 60,50 € IVA incl., se descuenta';
        bTel.setAttribute('href', '#contacto'); bTel.removeAttribute('data-cta-tel');
        bTel.addEventListener('click', function (e) { e.preventDefault(); prefill(c.ap, codigo); });
        $('.si', sigue).setAttribute('aria-pressed', 'true'); $('.no', sigue).removeAttribute('aria-pressed');
      });
      $('.no', sigue).addEventListener('click', function () {
        ok.classList.add('on'); llamar.classList.remove('on'); el.classList.remove('hot');
        $('.no', sigue).setAttribute('aria-pressed', 'true'); $('.si', sigue).removeAttribute('aria-pressed');
      });
    }
    var cp = $('[data-copy]', el);
    if (cp) cp.addEventListener('click', function () {
      var url = new URL(REL + 'codigos-error/#' + c.id, location.href).href;
      var done = function () { cp.textContent = 'Enlace copiado'; setTimeout(function () { cp.textContent = 'Copiar enlace a este código'; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    });
    refresca();
  }
  $$('.ficha[data-id]').forEach(bindFicha);

  function initBus(root) {
    var input = $('input', root), sug = $('.bus-sug', root), res = $('.bus-res', root), x = $('.bus-x', root);
    var apFijo = root.getAttribute('data-ap') || null, ap = apFijo, sel = -1, items = [];
    var chips = $$('.chip-btn[data-ap]', root);
    /* atajos «más buscados»: al elegir un aparato solo se ofrecen SUS códigos (nunca los de otro aparato) */
    var top = $('.bus-top', root), topHTML = top ? top.innerHTML : '';
    function bindAtajos() {
      $$('[data-cod]', root).forEach(function (b) { if (b._ok) return; b._ok = 1; b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; if (!c) return; if (ap && c.ap !== ap) { setAp(c.ap); } input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function pintaAtajos(k) {
      if (!top || apFijo) return;
      /* defensa: cualquier atajo de código que haya quedado fuera de .bus-top se elimina al elegir aparato */
      $$('[data-cod]', root).forEach(function (b) { if (!b.closest('.bus-top') && !b.closest('.bus-res')) { var li = b.closest('li'); (li || b).remove(); } });
      if (!k) { top.innerHTML = topHTML; bindAtajos(); return; }
      var a = APARATOS[k], mios = CODIGOS.filter(function (c) { return c.ap === k && !c.aviso; }).slice(0, 8), av = CODIGOS.filter(function (c) { return c.ap === k && c.aviso; });
      if (!mios.length && !av.length) { top.innerHTML = '<span class="bus-top-nota">' + esc(a.nombre) + ': sin códigos verificados de ' + esc(CONFIG.MARCA) + '. Dinos el síntoma y te decimos qué puede ser.</span>'; return; }
      top.innerHTML = 'Códigos de ' + esc(a.nombre.toLowerCase()) + ': <ul class="chips">' + mios.concat(av).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-cod="' + c.id + '">' + esc(c.cod.split('/')[0]) + '</button></li>'; }).join('') + '</ul>';
      bindAtajos();
    }
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      pintaAtajos(k);
      /* al cambiar de aparato se empieza de cero: el código anterior no se arrastra */
      input.value = ''; x.classList.remove('on'); limpia(); if (res) res.innerHTML = '';
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa' && placaSinCodigos()) placa(); }); });
    bindAtajos();
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      if (ap && c.ap !== ap && !apFijo) { ap = c.ap; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === c.ap ? 'true' : 'false'); }); pintaAtajos(c.ap); }
      limpia(); res.innerHTML = renderFicha(c); bindFicha($('.ficha', res));
      if (!reduced && root.getAttribute('data-scroll') !== 'no') setTimeout(function () { res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    function ambiguo(list, key) {
      res.innerHTML = '<div class="bus-amb"><p>' + esc(key) + ' existe en varios aparatos. ¿En cuál?</p><div class="g">' +
        list.map(function (c) { return '<button type="button" data-id="' + c.id + '">' + ico(c.ap) + esc(APARATOS[c.ap].nombre) + '</button>'; }).join('') + '</div></div>';
      $$('button', res).forEach(function (b) { b.addEventListener('click', function () { muestra(CODIGOS.filter(function (c) { return c.id === b.getAttribute('data-id'); })[0]); }); });
    }
    function nada(raw, key, apq, pre) {
      var a = apq ? APARATOS[apq] : null, art = a ? a.art : 'mi aparato';
      var quiza = (pre && pre.length) ? '<p>¿Querías decir…?</p><ul class="chips" style="margin-bottom:14px">' + pre.slice(0, 5).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-id="' + c.id + '">' + ico(c.ap) + c.cod.split('/')[0] + ' · ' + esc(APARATOS[c.ap].nombre) + '</button></li>'; }).join('') + '</ul>' : '';
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' ' + CONFIG.MARCA + ' que marca ' : 'mi aparato ' + CONFIG.MARCA + ' marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong>' + (a ? ' en ' + esc(a.nombre.toLowerCase()) : '') + ' verificado con documentación de <span class="marca">' + esc(CONFIG.MARCA) + '</span> y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta ' + esc(CONFIG.ETIQUETA) + ' (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el ' + esc(CONFIG.ETIQUETA) + ' →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    /* la placa solo va «por síntomas» si la marca no publica códigos verificados para ella (Siemens sí los tiene) */
    function placaSinCodigos() { return !!APARATOS.placa && !CODIGOS.some(function (c) { return c.ap === 'placa'; }); }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas <span class="marca">' + esc(CONFIG.MARCA) + '</span> avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa ' + CONFIG.MARCA + ' que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa' && placaSinCodigos()) { placa(); return; }
      if (!p.key && apq) { var av = CODIGOS.filter(function (c) { return c.ap === apq && c.aviso; }); if (av.length === 1) return muestra(av[0]); }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false, p.alt);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true, p.alt);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || (apq === 'placa' && placaSinCodigos())) { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true, p.alt).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false, p.alt); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0 || (p.alt && y.indexOf(p.alt) === 0); })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.indexOf(p.key) >= 0 ? disp.replace(p.key, '<mark>' + p.key + '</mark>') : (p.alt ? disp.replace(p.alt, '<mark>' + p.alt + '</mark>') : disp);
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn && !buscar1(p.key, apq, true).length) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En ' + esc(CONFIG.MARCA) + ', F y E son el mismo código (F18 = E18)</li>';
      sug.classList.add('on'); input.setAttribute('aria-expanded', 'true');
      $$('li[data-id]', sug).forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = li.querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === li.getAttribute('data-id'); })[0]); }); });
    }
    input.addEventListener('input', sugiere);
    input.addEventListener('keydown', function (e) {
      var lis = $$('li[data-id]', sug);
      if (e.key === 'ArrowDown' && lis.length) { e.preventDefault(); sel = (sel + 1) % lis.length; }
      else if (e.key === 'ArrowUp' && lis.length) { e.preventDefault(); sel = (sel - 1 + lis.length) % lis.length; }
      else if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && lis[sel]) { input.value = lis[sel].querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === lis[sel].getAttribute('data-id'); })[0]); } else go(input.value); return; }
      else if (e.key === 'Escape') { limpia(); return; }
      else return;
      lis.forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      input.setAttribute('aria-activedescendant', sel >= 0 ? lis[sel].id : '');
    });
    input.addEventListener('blur', function () { setTimeout(limpia, 150); });
    x.addEventListener('click', function () { input.value = ''; res.innerHTML = ''; limpia(); x.classList.remove('on'); input.focus(); });
    var f = $('form', root); if (f) f.addEventListener('submit', function (e) { e.preventDefault(); go(input.value); });
    root.__go = function (q) { input.value = q; go(q); };
  }
  $$('.bus').forEach(initBus);

  /* ---------- hub: abrir ancla y hacer scroll */
  function abreAncla() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var d = document.getElementById(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 60); }
  }
  abreAncla(); window.addEventListener('hashchange', abreAncla);

  /* ================================================================ FORMULARIO */
  var form = $('#form-llamada');
  function prefill(apId, codigo) {
    if (!form) return;
    if (apId) $$('[name=aparato]', form).forEach(function (r) { r.checked = r.value === APARATOS[apId].nombre; });
    if (codigo) { $('[name=codigo]', form).value = codigo; var s = $$('[name=sintoma]', form).filter(function (r) { return r.value === 'Error en pantalla'; })[0]; if (s) s.checked = true; }
    form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('[name=telefono]', form).focus({ preventScroll: true }); }, 500);
  }
  window.RBV = { prefill: prefill, zona: Z };
  function abreWA(t) { var w = window.open(wa(t), '_blank'); if (w) w.opener = null; else location.href = wa(t); }
  if (form) {
    var zsel = $('[name=zona]', form);
    if (zsel) { if (Z.get()) zsel.value = Z.get(); zsel.addEventListener('change', function () { Z.set(zsel.value); $$('a[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); }); }); }
    var dl = $('#lista-codigos'); if (dl) { var ks = {}; CODIGOS.forEach(function (c) { c.keys.forEach(function (k) { if (k.length > 2) ks[k] = APARATOS[c.ap].nombre; }); }); dl.innerHTML = Object.keys(ks).sort().map(function (k) { return '<option value="' + k + '">' + ks[k] + '</option>'; }).join(''); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', form).value) return; /* honeypot */
      var tel = $('[name=telefono]', form), g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, '');
      var okTel = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !okTel);
      var rg = $('[name=rgpd]', form), gr = rg.closest('.f-g'); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = ($$('[name=aparato]:checked', form)[0] || {}).value || '', si = ($$('[name=sintoma]:checked', form)[0] || {}).value || '';
      var cod = $('[name=codigo]', form).value.trim().toUpperCase(), zona = zsel ? zsel.value : '';
      var t = 'Hola, quiero que me llaméis.';
      if (ap) t += ' Aparato: ' + ap + ' ' + CONFIG.MARCA + '.'; if (si) t += ' Le pasa: ' + si.toLowerCase() + '.'; if (cod) t += ' Código: ' + cod + '.';
      if (zona) t += ' Zona: ' + zona + '.'; t += ' Teléfono: ' + tel.value.trim() + '.';
      var fin = function () { form.hidden = true; var ok = $('.f-ok', form.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus(); };
      if (CONFIG.FORM_ENDPOINT) {
        fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ aparato: ap, sintoma: si, codigo: cod, telefono: tel.value, zona: zona, mensaje: t }) })
          .then(function (r) { if (!r.ok) throw 0; fin(); }).catch(function () { abreWA(t); fin(); });
      } else { abreWA(t); fin(); }
    });
  }

  /* ---------- mini formulario del hero (landings de aparato) */
  function validaTel(tel) { var g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, ''); var ok = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !ok); return ok; }
  $$('.form-mini').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', f).value) return;
      var tel = $('[name=telefono]', f), rg = $('[name=rgpd]', f), gr = rg.closest('.f-g');
      var okTel = validaTel(tel); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = $('[name=aparato]', f).value, si = $('[name=sintoma]', f).value;
      var t = 'Hola, quiero que me llaméis. Aparato: ' + ap + ' ' + CONFIG.MARCA + '.' + (si ? ' Le pasa: ' + si.toLowerCase() + '.' : '') + (Z.get() ? ' Zona: ' + Z.get() + '.' : '') + ' Teléfono: ' + tel.value.trim() + '.';
      abreWA(t); f.hidden = true; var ok = $('.f-ok', f.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus();
    });
  });
  var hfb = $('.hero-form-b');
  if (hfb) hfb.addEventListener('click', function () { var on = hfb.getAttribute('aria-expanded') === 'true'; hfb.setAttribute('aria-expanded', on ? 'false' : 'true'); hfb.parentNode.classList.toggle('on', !on); if (!on) setTimeout(function () { $('.form-mini [name=telefono]').focus({ preventScroll: false }); }, 50); });
  /* ---------- desplegable de aparatos (cabecera) */
  var dd = $('.dd');
  if (dd) {
    var ddb = $('.dd-b', dd);
    ddb.addEventListener('click', function () { var on = dd.classList.toggle('on'); ddb.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'); Z.set(n);
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="#contacto">Te llamamos en &lt; 1 h</a>') + '</div>';
      if (zsel) zsel.value = n;
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
  }
})();
