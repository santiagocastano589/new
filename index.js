document.addEventListener('DOMContentLoaded', () => {
    const especialistas = {};

    function loadEspecialistas() {
        $.ajax({
            url: 'especialistas.php',
            method: 'GET',
            dataType: 'text',
            success: function(data) {
                try {
                    const jsonData = JSON.parse(data);
                    jsonData.forEach(item => {
                        const { COD_ESPECIALIDAD, COD_MEDICO, MEDICO } = item;
                        if (!especialistas[COD_ESPECIALIDAD]) {
                            especialistas[COD_ESPECIALIDAD] = [];
                            // console.log(especialistas[COD_ESPECIALIDAD]);  
                        }
                        especialistas[COD_ESPECIALIDAD].push({ value: COD_MEDICO, name: MEDICO });
                    });
                } 
                catch (error) {
                    console.error('Error al cargar los especialistas:', error);
                }
            }, 
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data:', textStatus, errorThrown, jqXHR);
            }
        });
    }

    loadEspecialistas();
    document.getElementById('Especialidad').addEventListener('change', function() {
        const especialidad = this.value;
        const especialistaSelect = document.getElementById('Especialista');
        especialistaSelect.innerHTML = '<option value="">Seleccione el Especialista</option>';
        if (especialistas[especialidad]) {
            especialistas[especialidad].forEach(function(especialista) {
                const option = document.createElement('option');
                option.value = especialista.value;
                option.textContent = especialista.name;
                especialistaSelect.appendChild(option);
            });
        }
    });


    const form = document.getElementById('formulario');
        const confirmModal = document.getElementById('confirmModal');
        const successModal = document.getElementById('successModal');

        
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            confirmModal.style.display = 'block';
        });

        document.getElementById('closeConfirm').onclick = function() {
            confirmModal.style.display = 'none';
        };
    
        document.getElementById('confirmYes').onclick = function() {
            successModal.style.display = 'block';
            confirmModal.style.display = 'none';
        };
    
        document.getElementById('confirmNo').onclick = function() {
            successModal.style.display = 'none';
            confirmModal.style.display = 'none';
        };
    
        // document.getElementById('closeSuccess').onclick = function() {
        //     successModal.style.display = 'none';
        // };
    
        document.getElementById('okSuccess').onclick = function() {
            form.submit();
            successModal.style.display = 'none';
        };
    
        // window.onclick = function(event) {
        //     if (event.target == confirmModal || event.target == successModal) {
        //         confirmModal.style.display = 'none';
        //         successModal.style.display = 'none';
        //     }
        // };


});

