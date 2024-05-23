<template>
  <div class="parent">
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
  </div>
</template>


<style>
  .parent {
    width: 800px;
    height: 500px;
    border: 2px solid red;
    margin: 100px;

    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  .child {
    width: 120px;
    height: 60px;
    background-color: blue;
  }
</style>