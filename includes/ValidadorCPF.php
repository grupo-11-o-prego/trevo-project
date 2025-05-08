<?php

namespace Includes;

class ValidadorCPF
{
    /**
     * Valida um CPF.
     *
     * @param string $cpf
     * @return bool
     */
    public static function validar(string $cpf): bool
    {
        // Remove caracteres não numéricos
        $cpf = preg_replace('/\D/', '', $cpf);

        // Verifica se o CPF tem 11 dígitos
        if (strlen($cpf) !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
        if (preg_match('/^(\d)\1{10}$/', $cpf)) {
            return false;
        }

        // Calcula os dígitos verificadores
        for ($t = 9; $t < 11; $t++) {
            $soma = 0;
            for ($i = 0; $i < $t; $i++) {
                $soma += $cpf[$i] * (($t + 1) - $i);
            }
            $digito = (10 * $soma) % 11;
            $digito = $digito === 10 ? 0 : $digito;

            if ($cpf[$t] != $digito) {
                return false;
            }
        }

        return true;
    }
}
