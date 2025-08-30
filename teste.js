(function() {
    // IIFE (Immediately Invoked Function Expression) para nÃ£o poluir o escopo global.

    // --- 1. Templates de HTML e CSS ---
    const uiHTML = `
        <div id="test-suite-container">
            <h2 class="test-suite-header">SuÃ­te de Testes</h2>
            <label for="test-suite-selector">Selecione o Projeto:</label>
            <select id="test-suite-selector">
                <option value="">-- Selecione --</option>
                <option value="stream-deck">Stream Deck de Ãudio</option>
                <!-- Adicione novos projetos aqui -->
            </select>
            <button id="run-tests-button">Rodar Testes</button>
            <div class="credits">
                Inspirado no <a href="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js" target="_blank" rel="noopener noreferrer">pacote de testes do freeCodeCamp</a>.
            </div>
        </div>
        <div id="mocha-results">
            <div id="mocha">
                 <button id="close-results-button">&times;</button>
                 <!-- O conteÃºdo do Mocha serÃ¡ injetado aqui -->
            </div>
        </div>
    `;

    const uiCSS = `
        #test-suite-container {
            position: fixed; top: 1rem; left: 1rem; z-index: 9999;
            background-color: white; border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15); padding: 1.5rem;
            width: 300px; font-family: sans-serif; color: #333;
        }
        #test-suite-container .test-suite-header { font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; }
        #test-suite-container label { display: block; font-size: 0.9rem; margin-bottom: 0.5rem; }
        #test-suite-container select, #test-suite-container button { width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box; }
        #test-suite-container button { margin-top: 1rem; background-color: #007bff; color: white; font-weight: bold; cursor: pointer; border: none; }
        #test-suite-container button:hover { background-color: #0056b3; }
        #test-suite-container button:disabled { background-color: #5a6268; cursor: not-allowed; }
        #test-suite-container .credits { font-size: 0.75rem; color: #6c757d; text-align: center; margin-top: 1rem; }
        #test-suite-container .credits a { color: #007bff; text-decoration: none; }
        #test-suite-container .credits a:hover { text-decoration: underline; }
        #mocha-results { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; overflow-y: auto; padding: 2rem; box-sizing: border-box; }
        #mocha { position: relative; background: white; padding: 1.5rem; border-radius: 8px; margin: 2rem auto; max-width: 90%; width: 800px; padding-top: 60px; }
        #close-results-button { position: absolute; top: 1rem; right: 1rem; background: #f0f0f0; border: 1px solid #ddd; color: #333; font-weight: bold; cursor: pointer; padding: 0; border-radius: 50%; font-size: 1.5rem; width: 2.5rem; height: 2.5rem; line-height: 2.5rem; text-align: center; z-index: 10001; }
        #close-results-button:hover { background: #e0e0e0; border-color: #bbb; }
        #mocha #mocha-stats { position: absolute; top: 1rem; left: 1.5rem; right: 5rem; display: flex; align-items: center; justify-content: flex-start; gap: 1rem; font-size: 0.8rem; color: #666; margin: 0; padding: 0; }
        #mocha #mocha-stats li { list-style: none; margin: 0; padding: 0; display: flex; align-items: center; }
        #mocha #mocha-stats .progress { order: -1; }
        #mocha #mocha-stats canvas { width: 30px; height: 30px; }
        #mocha #mocha-stats em { font-weight: bold; font-style: normal; color: #333; }
        #mocha-report { margin-top: 10px; }
    `;

    // --- 2. DefiniÃ§Ã£o das SuÃ­tes de Teste ---
    const testSuites = {
        'novo-projeto': function() { /* ... testes do novo projeto ... */ },
        'stream-deck': function() {
            const assert = chai.assert;
            describe('Testes para o Projeto Stream Deck de Ãudio', function() {
                
                describe('Estrutura e ConteÃºdo', function() {
                    // ... testes de estrutura existentes ...
                    it('Deve existir um elemento principal com o id="stream-deck"', function() {
                        const streamDeck = document.getElementById('stream-deck');
                        assert.isNotNull(streamDeck, 'Elemento #stream-deck nÃ£o encontrado');
                    });
                    it('Dentro do #stream-deck, deve haver um elemento com id="display"', function() {
                        const display = document.getElementById('display');
                        assert.isNotNull(display, 'Elemento #display nÃ£o encontrado');
                        assert.isOk(document.querySelector('#stream-deck #display'), '#display nÃ£o Ã© filho de #stream-deck');
                    });
                    it('Dentro do #stream-deck, devem existir 9 elementos clicÃ¡veis com a classe "deck-button"', function() {
                        const buttons = document.querySelectorAll('#stream-deck .deck-button');
                        assert.lengthOf(buttons, 9, 'NÃ£o foram encontrados 9 .deck-button dentro de #stream-deck');
                    });
                    it('Cada .deck-button deve conter um dos nÃºmeros de 1 a 9', function() {
                        const buttons = document.querySelectorAll('.deck-button');
                        const expectedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
                        const actualKeys = Array.from(buttons).map(btn => btn.innerText.trim());
                        assert.deepEqual(actualKeys, expectedKeys, 'Os botÃµes nÃ£o contÃªm os nÃºmeros corretos ou nÃ£o estÃ£o na ordem correta');
                    });
                    it('Dentro de cada .deck-button, deve haver um elemento <audio> com classe "clip", src e um id numÃ©rico', function() {
                        const buttons = document.querySelectorAll('.deck-button');
                        buttons.forEach(button => {
                            const audio = button.querySelector('audio.clip');
                            assert.isNotNull(audio, `BotÃ£o "${button.innerText}" nÃ£o contÃ©m um elemento <audio class="clip">`);
                            assert.isOk(audio.hasAttribute('src'), `O Ã¡udio no botÃ£o "${button.innerText}" nÃ£o tem um atributo src`);
                            assert.isOk(audio.hasAttribute('id'), `O Ã¡udio no botÃ£o "${button.innerText}" nÃ£o tem um id`);
                            assert.strictEqual(audio.id, button.innerText.trim(), `O id do Ã¡udio ("${audio.id}") nÃ£o corresponde ao texto do botÃ£o pai ("${button.innerText.trim()}")`);
                        });
                    });
                });

                describe('Funcionalidade', function() {
                    // ... testes de funcionalidade existentes ...
                    it('Quando um .deck-button Ã© clicado, o Ã¡udio correspondente deve ser reproduzido', function() {
                        const audio = document.getElementById('5');
                        assert.isNotNull(audio, 'NÃ£o foi encontrado o elemento de Ã¡udio com id="5" para o teste');
                        const button = audio.parentElement;
                        assert.isOk(button && button.classList.contains('deck-button'), 'O elemento de Ã¡udio com id="5" nÃ£o estÃ¡ dentro de um .deck-button');
                        audio.pause(); 
                        audio.currentTime = 1; 
                        button.click();
                        assert.isFalse(audio.paused, 'O Ã¡udio nÃ£o tocou apÃ³s o clique');
                        assert.strictEqual(audio.currentTime, 0, 'O Ã¡udio nÃ£o foi rebobinado para o inÃ­cio');
                    });
                    it('Quando uma tecla numÃ©rica (1-9) Ã© pressionada, o Ã¡udio correspondente deve ser reproduzido', function() {
                        const keyToPress = '7';
                        const audio = document.getElementById(keyToPress);
                        assert.isNotNull(audio, `NÃ£o foi encontrado o elemento de Ã¡udio com id="${keyToPress}"`);
                        audio.pause();
                        audio.currentTime = 1;
                        const event = new KeyboardEvent('keydown', { 'key': keyToPress });
                        document.dispatchEvent(event);
                        assert.isFalse(audio.paused, `O Ã¡udio para a tecla "${keyToPress}" nÃ£o tocou`);
                        assert.strictEqual(audio.currentTime, 0, 'O Ã¡udio nÃ£o foi rebobinado para o inÃ­cio');
                    });
                    it('Quando um .deck-button Ã© acionado, o nome do seu Ã¡udio deve ser exibido no #display', function() {
                        const button = document.querySelector('.deck-button');
                        const audio = button.querySelector('.clip');
                        button.click();
                        const display = document.getElementById('display');
                        const expectedName = audio.getAttribute('data-name');
                        assert.strictEqual(display.innerText, expectedName, 'O #display nÃ£o mostrou o nome correto do Ã¡udio (do atributo data-name)');
                    });
                });

                // Testes de Layout e Estilo (NOVOS TESTES)
                describe('Layout e Estilo', function() {
                    it('O elemento #stream-deck deve estar centralizado horizontalmente na pÃ¡gina', function() {
                        const streamDeck = document.getElementById('stream-deck');
                        assert.isNotNull(streamDeck, 'Elemento #stream-deck nÃ£o encontrado para o teste de layout');
                        const rect = streamDeck.getBoundingClientRect();
                        const viewportWidth = window.innerWidth;
                        const leftSpace = rect.left;
                        const rightSpace = viewportWidth - rect.right;
                        assert.approximately(leftSpace, rightSpace, 15, 'O #stream-deck nÃ£o estÃ¡ centralizado. Verifique se o body estÃ¡ usando flexbox ou se as margens laterais estÃ£o como "auto"');
                    });

                    it('O fundo do #stream-deck e dos .deck-button deve ser Azul Marinho (rgb(0, 51, 153))', function() {
                        const streamDeck = document.getElementById('stream-deck');
                        const button = document.querySelector('.deck-button');
                        assert.isNotNull(streamDeck, 'Elemento #stream-deck nÃ£o encontrado');
                        assert.isNotNull(button, 'Nenhum .deck-button encontrado');
                        
                        const expectedColor = 'rgb(0, 51, 153)';
                        
                        const deckStyle = window.getComputedStyle(streamDeck);
                        assert.strictEqual(deckStyle.backgroundColor, expectedColor, `A cor de fundo do #stream-deck nÃ£o Ã© ${expectedColor}`);
                        
                        const buttonStyle = window.getComputedStyle(button);
                        assert.strictEqual(buttonStyle.backgroundColor, expectedColor, `A cor de fundo do .deck-button nÃ£o Ã© ${expectedColor}`);
                    });

                    it('O texto dos .deck-button deve ser Branco (rgb(255, 255, 255))', function() {
                        const button = document.querySelector('.deck-button');
                        assert.isNotNull(button, 'Nenhum .deck-button encontrado');
                        const buttonStyle = window.getComputedStyle(button);
                        const expectedColor = 'rgb(255, 255, 255)';
                        assert.strictEqual(buttonStyle.color, expectedColor, `A cor do texto do .deck-button nÃ£o Ã© ${expectedColor}`);
                    });

                    it('O texto do #display deve ser Amarelo Dourado (rgb(254, 177, 0))', function() {
                        const display = document.getElementById('display');
                        assert.isNotNull(display, 'Elemento #display nÃ£o encontrado');
                        const displayStyle = window.getComputedStyle(display);
                        const expectedColor = 'rgb(254, 177, 0)';
                        assert.strictEqual(displayStyle.color, expectedColor, `A cor do texto do #display nÃ£o Ã© ${expectedColor}`);
                    });
                });

                describe('Funcionalidade AvanÃ§ada (BÃ´nus)', function() {
                    it('Deve existir um elemento clicÃ¡vel com id="loop-toggle"', function() {
                        const loopToggle = document.getElementById('loop-toggle');
                        assert.isNotNull(loopToggle, 'Elemento #loop-toggle nÃ£o encontrado.');
                    });

                    it('Quando o #loop-toggle estÃ¡ ativado, clicar em um .deck-button deve fazer o Ã¡udio tocar em loop', function() {
                        const loopToggle = document.getElementById('loop-toggle');
                        const audio = document.getElementById('1');
                        assert.isNotNull(loopToggle, 'Elemento #loop-toggle nÃ£o encontrado.');
                        assert.isNotNull(audio, 'Elemento de Ã¡udio com id="1" nÃ£o encontrado.');
                        
                        // Garante que o loop esteja desligado no inÃ­cio do teste
                        if (loopToggle.classList.contains('active')) {
                           loopToggle.click(); 
                        }
                        audio.loop = false;
                        
                        // Ativa o loop e toca o som
                        loopToggle.click();
                        audio.parentElement.click();

                        assert.isTrue(audio.loop, 'A propriedade loop do Ã¡udio nÃ£o foi definida como true apÃ³s ativar o toggle e clicar no botÃ£o.');
                    });
                    
                    it('Quando o #loop-toggle Ã© desativado, o Ã¡udio deve tocar apenas uma vez', function() {
                        const loopToggle = document.getElementById('loop-toggle');
                        const audio = document.getElementById('2');
                        assert.isNotNull(loopToggle, 'Elemento #loop-toggle nÃ£o encontrado.');
                        assert.isNotNull(audio, 'Elemento de Ã¡udio com id="2" nÃ£o encontrado.');

                        // Garante que o loop esteja ligado
                        if (!loopToggle.classList.contains('active')) {
                           loopToggle.click(); 
                        }
                        audio.loop = true;

                        // Desativa o loop e toca o som
                        loopToggle.click();
                        audio.parentElement.click();

                        assert.isFalse(audio.loop, 'A propriedade loop do Ã¡udio nÃ£o foi definida como false apÃ³s desativar o toggle e clicar no botÃ£o.');
                    });
                });
            });
        }
    };

    // --- 3. LÃ³gica de Carregamento e InjeÃ§Ã£o ---
    document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.innerHTML = uiCSS;
        document.head.appendChild(style);
        
        const container = document.createElement('div');
        container.id = 'fcc-test-suite-helpers';
        container.innerHTML = uiHTML;
        document.body.appendChild(container);
        
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/mocha/9.2.2/mocha.min.js', () => {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/chai/4.3.6/chai.min.js', initializeTestSuite);
        });
    });

    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function initializeTestSuite() {
        const projectSelector = document.getElementById('test-suite-selector');
        const runButton = document.getElementById('run-tests-button');
        const resultsContainer = document.getElementById('mocha-results');
        const mochaDiv = document.getElementById('mocha');
        
        function runTests() {
            const selectedProject = projectSelector.value;
            if (!selectedProject) {
                alert('Por favor, selecione um projeto para testar.');
                return;
            }

            runButton.disabled = true;
            runButton.innerText = 'Recarregue para testar novamente';
            
            mochaDiv.innerHTML = '<button id="close-results-button">&times;</button>';
            
            document.getElementById('close-results-button').addEventListener('click', () => {
                resultsContainer.style.display = 'none';
            });
            
            mocha.setup({ ui: 'bdd', reporter: 'html' });
            
            if (testSuites[selectedProject]) {
                testSuites[selectedProject]();
            } else {
                console.error(`SuÃ­te de testes para "${selectedProject}" nÃ£o encontrada.`);
                return;
            }
            
            resultsContainer.style.display = 'block';
            mocha.run();
        }

        runButton.addEventListener('click', runTests);
        document.getElementById('close-results-button').addEventListener('click', () => {
            resultsContainer.style.display = 'none';
        });
        
        const mochaCSS = document.createElement('link');
        mochaCSS.rel = 'stylesheet';
        mochaCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/mocha/9.2.2/mocha.min.css';
        document.head.appendChild(mochaCSS);
    }

})();