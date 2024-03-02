<template>
  <div
    class="mb-7"
    style="background-color: #deecff;">
    <h1>Profile</h1>
  </div>

  <div>
    <h1
      class="ml-8"
      style="font-size: 24px;">
      Tu perfil
    </h1>
    <img
      alt="Event image"
      src="@/assets/images/temp/yoga.png"
      class="center"
      style="display: block; width: 30%; border-radius: 50%;" />
    <ul
      class="-ml-7"
      style="list-style-type:none;">
      <li
        v-for="(item, index) in carProfile"
        :key="index">
        <div class="row mb-7 mr-3">
          <div style="margin:auto; text-align: center;display: flex; align-items: center; justify-content: left;">
            <div
              class="ml-3"
              style="text-align: left; width: 70%;">
              <p style="font-size: 6vw; font-weight: bold">
                Name: {{ item.name }}
              </p>
              <p style="font-size: 6vw; font-weight: bold">
                DNI: {{ item.dni }}
              </p>
              <p style="font-size: 6vw; font-weight: bold">
                Username: {{ item.username }}
              </p>
              <p style="font-size: 6vw; font-weight: bold">
                Email: {{ item.email }}
              </p>
              <p style="font-size: 6vw; font-weight: bold">
                City: {{ item.city }}
              </p>
              <p style="font-size: 6vw; font-weight: bold">
                TipoCliente: {{ item.tipoCliente }}
              </p>
              <p style="font-size: 6vw; font-weight: bold">
                Latitud: {{ item.latitud }}
              </p>
              <p style="font-size: 6vw; font-weight: bold">
                Longitud: {{ item.longitud }}
              </p>
              <p style="font-size: 6vw; font-weight: bold">
                TipoSubs: {{ item.tipoSubs }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">

const carProfile = [
  {
    name: 'Nombre',
    dni: 'dni',
    username: 'nombreUsuario',
    email: 'correo electronico',
    city: 'ciudad',
    tipoCliente: 'artista',
    latitud: 'latitud',
    longitud: 'longitud',
    tipoSubs: 'tipoSubs'
  }
];

</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
