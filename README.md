# ROBO AFIASOCCER 

## FLUXO


<ul>
    <li>
        EMAILS: o robo entra no emails definido no arquivo .env e busca todos os email que contem no titulo a palavra 'Registro - #' seguida por qualquer numero. Depois de pegar o id desses emails, ele le o corpo do emails e pega todas as informções que contam na tabela padrão e salva no banco de dados. 
    </li>
    <li> 
        PREENCHIMENTO DO FORMULARIO DO RD STATION: Apos a busca dos email, o robo vai ate o formulario pre-configurado e preenche todos os campos. Apos o preenchimento, será mudado o status de enviado para TRUE no banco de dados do registro.
    </li>

</ul>

## INSTALAÇÃO E CONFIGURAÇÃO
---

<p>
    Ao clonar o projeto, navegue ate a paste raiz pelo terminal e insira os seguintes comandos:
</p>

```
 npm i
```

<p>
    Logo em seguida, é necessario criar o arquivo .env com base no arquivo .env.example
</p>

<p>
    Após setar as variaves de ambiantes pelo arquivo .env,
    realize os seguintes comandos:  
</p>

```
npx knex migrate:latest
```

## EXECUÇÃO
---

<p>
    Apos realizar a instalação e configuração do ambiente, execute os seguintes comandos: 
</p>

PARA EXECUTAR A BUSCA DOS EMAILS NO AMBIENTE DE DESENVOLVIMENTO
```
npm run email:dev
```

PARA EXECUTAR O PREENCHIMENTO DO FORMULARIO NO AMBIENTE DE DESENVOLVIMENTO
```
npm run fillForm:dev
```

PARA REALIZAR O BUILD DO PROJETO
```
npm run build
```


PARA EXECUTAR A BUSCA DOS EMAILS NO AMBIENTE DE PRODUÇÃO
```
npm run email:prod
```

PARA EXECUTAR O PREENCHIMENTO DO FORMULARIO NO AMBIENTE DE PRODUÇÃO
```
npm run fillForm:prod
```

### TECNOLOGIAS UTILIZADAS

<ul>
    <li>
        NODE
    </li>
    <li>
        POSTGRES
    </li>
    <li>
        KNEX
    </li>
    <li>
        TYPESCRIPT
    </li>
    <li>
        PUPPETEER
    </li>
    <li>
        BABEL
    </li>
</ul>