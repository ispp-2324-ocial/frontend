<template>
  <Boton
    :class="{'selectedp': isPlan}"
    class="row plan"
    style="text-transform: uppercase">
    <div
      class="column left">
      <p>
        <slot name="left" />
      </p>
    </div>
    <div
      class="column right">
      <p>
        <slot name="right" />
      </p>
    </div>
  </Boton>
</template>

<script setup lang="ts">
withDefaults (
  defineProps<{
    isPlan?: boolean
  }>(),
  {
    isPlan: false
  });
</script>

<style scoped>
.left {
  width: 27%;
  font-weight: bold;
  font-size: clamp(18px, 5.5vw, 25px);
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 1vh;
}
.right {
  width: 70%;
  font-weight: bold;
  padding: 2%;
  font-size: clamp(14px, 4vw, 18px);
  justify-content: left;
  text-align: left;
  align-items: center;
  display: flex;
  margin-left: 3vw;
  margin-right: -6vw;
}
.row:after {
  content: "";
  display: table;
  clear: both;
  }

  .plan{
  border: solid 1px #0e4791;
  border-radius: 25px;
  height: clamp(100px, 24vh, 300px);
  margin-bottom: 2vh;
  justify-content: center;
  display: flex;
  width: 100%;
}
.selectedp {
  border: solid 5px #0e4791;
  background-color: rgb(255, 247, 236);
}
</style>
