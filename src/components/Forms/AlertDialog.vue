<template>
  <RAlertDialog>
    <RAlertDialogTrigger as-child>
      <Button variant="outline">
        Show Dialog
      </Button>
    </RAlertDialogTrigger>
    <RAlertDialogContent>
      <RAlertDialogHeader>
        <RAlertDialogTitle>{{ $t('estasSeguro?') }}</RAlertDialogTitle>
        <RAlertDialogDescription>
          {{ $t('deleteAlerta') }}
        </RAlertDialogDescription>
      </RAlertDialogHeader>
      <RAlertDialogFooter>
        <RAlertDialogCancel>{{ $t('Cancelar') }}</RAlertDialogCancel>
        <RAlertDialogAction>{{ $t('Continuar') }}</RAlertDialogAction>
      </RAlertDialogFooter>
    </RAlertDialogContent>
  </RAlertDialog>
</template>

<script setup lang="ts">
import {
  RAlertDialog,
  RAlertDialogAction,
  RAlertDialogCancel,
  RAlertDialogContent,
  RAlertDialogDescription,
  RAlertDialogFooter,
  RAlertDialogHeader,
  RAlertDialogTitle,
  RAlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
</script>
