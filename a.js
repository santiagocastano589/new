document.addEventListener('DOMContentLoaded', () => {
    const fecha1 = document.getElementById('fecha1');
    const fecha2 = document.getElementById('fecha2');
    const observacionesSelect = document.getElementById('Observacion');
    const especialidadSelect = document.getElementById('Especialidad');
    const especialistaSelect = document.getElementById('Especialista');
    const tableBody = document.getElementById('tableBody');
    const clearFiltersButton = document.getElementById('clearFilters'); // Asegúrate de tener un botón con este ID

    let searchTerm = '';
    let especialidadFilter = '';
    let especialistaFilter = '';
    let observacionesFilter = '';

    const especialistas = [];
    const especialidades = {};



    function filterResults() {
        $.ajax({
            url: 'buscarPaciente.php',
            method: 'GET',
            dataType: 'text',
            success: function(data) {
                tableBody.innerHTML = '';
                try {
                    const jsonData = JSON.parse(data);

                    jsonData.forEach(row => {
                        const { FecRadi, TipDoc, Documento, Paciente, Tel1, tel2, Cups1, Cups2, Cups3, OtroCups, OtroProcedimiento, Esp, Especialista, Eps, TipoContrato, Regimen, Anestesia, FecAnestesia, Observacion } = row;
                        const matchesEspecialidad = especialidadFilter === '' || Esp.toLowerCase() === especialidadFilter.toLowerCase();
                        const matchesEspecialista = especialistaFilter === '' || Especialista.toLowerCase().includes(especialistaFilter.toLowerCase());
                        const matchesObservacion = observacionesFilter === '' || Observacion.toLowerCase().includes(observacionesFilter.toLowerCase());

                        // const desde = fecha1 === '' || FecRadi.toLowerCase().includes(fecha1);
                        // const hasta = fecha2 === '' || FecRadi.toLowerCase().includes(fecha2);
                        // console.log(desde,hasta);
                        

                        if (matchesEspecialidad && matchesEspecialista && matchesObservacion) {
                            const rowElement = document.createElement('tr');
                            rowElement.innerHTML = `
                                <td>${FecRadi}</td>
                                <td>${TipDoc}</td>
                                <td>${Documento}</td>
                                <td>${Paciente}</td>
                                <td>${Tel1}</td>
                                <td>${tel2}</td>
                                <td>${Cups1}</td>
                                <td>${Cups2}</td>
                                <td>${Cups3}</td>
                                <td>${OtroCups}</td>
                                <td>${OtroProcedimiento}</td>                                
                                <td>${especialidades[Esp] || Esp}</td>
                                <td>${especialistas[Especialista] || Especialista}</td>
                                <td>${Eps}</td>
                                <td>${TipoContrato}</td>
                                <td>${Regimen}</td>
                                <td>${Anestesia}</td>
                                <td>${FecAnestesia}</td>
                                <td>
                                    <select name="Observacion" class="observacion-select" data-documento="${Documento}" data-fecRadi="${FecRadi}" required>
                                        <option value="${Observacion}">${Observacion}</option>
                                        <option value="NO CONTESTA/APAGADO">NO CONTESTA/APAGADO</option>
                                        <option value="NO SE LA VA A REALIZAR">NO SE LA VA A REALIZAR</option>
                                        <option value="PROGRAMADO">PROGRAMADO</option>
                                        <option value="REALIZADO">REALIZADO</option>
                                    </select>   
                                </td>
                                
                            `;
                            tableBody.appendChild(rowElement);

                        }
                        
                    });

                    

                    const observacionSelects = document.querySelectorAll('.observacion-select');
                    observacionSelects.forEach(select => {
                        select.addEventListener('change', (event) => {
                            const observacion = event.target.value;
                            const documento = event.target.getAttribute('data-documento');
                            const FecRadi = event.target.getAttribute('data-fecRadi');
                            $.ajax({
                                url: 'actualizar.php',
                                method: 'POST',
                                data: { observacion, documento, FecRadi },
                                dataType: 'text',
                                success: function(result) {
                                    const jsonData = JSON.parse(result);
                                    if (jsonData.success) {
                                        console.log('Observación actualizada correctamente');
                                    } else {
                                        console.error('Error al actualizar observación:', jsonData.error);
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    console.error('Error en la solicitud:', textStatus, errorThrown);
                                }
                            });
                        });
                    });

                } catch (e) {
                    console.error("Error al convertir el texto a JSON:", e);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data:', textStatus, errorThrown, jqXHR);
            }
        });
    }

    function clearFilters() {
        especialidadFilter = '';
        especialistaFilter = '';
        observacionesSelect.value = '';
        observacionesFilter = '';
        especialidadSelect.value = '';
        fecha1.value = '';
        fecha2.value = '';
        especialistaSelect.innerHTML = '<option value="">Seleccione el Especialista</option>';
        filterResults();
    }

    clearFiltersButton.addEventListener('click', clearFilters);

    especialidadSelect.addEventListener('change', function() {
        especialidadFilter = this.value;
        especialistaSelect.innerHTML = '<option value="">Seleccione el Especialista</option>';
        if (especialistas[especialidadFilter]) {
            especialistas[especialidadFilter].forEach(especialista => {
                const option = document.createElement('option');
                option.value = especialista.value;
                option.textContent = especialista.name;
                especialistaSelect.appendChild(option);
            });
        }
        filterResults();
    });

    function loadEspecialistas() {
        $.ajax({
            url: 'especialistas.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                data.forEach(item => {
                    const { COD_ESPECIALIDAD, COD_MEDICO, MEDICO } = item;
                    if (!especialistas[COD_ESPECIALIDAD]) {
                        especialistas[COD_ESPECIALIDAD] = [];                       
                    }
                    especialistas[COD_ESPECIALIDAD].push({ value: COD_MEDICO, name: MEDICO });
                    especialidades[COD_ESPECIALIDAD] = item.ESPECIALIDAD;
                    
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data:', textStatus, errorThrown);
            }
        });
    }

    function loadEspecialistasX() {
        $.ajax({
            url: 'med.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                data.forEach(item => {
                    const { COD_MEDICO, MEDICO } = item;
                    
                    especialistas.push(MEDICO);
                    especialistas[COD_MEDICO] = item.MEDICO
                    
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data:', textStatus, errorThrown);
            }
        });
        
    }




    especialistaSelect.addEventListener('change', function() {
        especialistaFilter = this.value;
        filterResults();
    });
    observacionesSelect.addEventListener('change', function() {
        observacionesFilter = this.value;
        filterResults();
    });
    fecha1.addEventListener('change', function() {
        observacionesFilter = this.value;
        filterResults();
    });
    fecha1.addEventListener('change', function() {
        observacionesFilter = this.value;
        filterResults();
    });

    filterResults();
    loadEspecialistas();
    loadEspecialistasX();

});

