        document.addEventListener('DOMContentLoaded', function() {
            // Modal functionality
            const modal = document.getElementById('dataModal');
            const openModalBtn = document.getElementById('openModal');
            const closeModalBtn = document.getElementById('closeModal');
            const calculateBtn = document.getElementById('calculate');
            
            openModalBtn.addEventListener('click', function() {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
            
            closeModalBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Calculate on button click
            calculateBtn.addEventListener('click', function() {
                calculateProfit();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Initial calculation
            calculateProfit();
            
            function calculateProfit() {
                // Obter valores dos inputs
                const quantity = parseFloat(document.getElementById('quantity').value) || 0;
                const cost = parseFloat(document.getElementById('cost').value) || 0;
                const price = parseFloat(document.getElementById('price').value) || 0;
                const commission = parseFloat(document.getElementById('commission').value) || 0;
                const tax = parseFloat(document.getElementById('tax').value) || 0;
                const fixedFee = parseFloat(document.getElementById('fixed-fee').value) || 0;
                
                // Calcular valores por fardo
                const commissionPerFardo = price * (commission / 100);
                const taxPerFardo = price * (tax / 100);
                const platformCostPerFardo = commissionPerFardo + taxPerFardo + fixedFee;
                const grossProfitPerFardo = price - cost;
                const netProfitPerFardo = price - cost - platformCostPerFardo;
                
                // Calcular valores totais
                const totalRevenue = quantity * price;
                const totalSandCost = quantity * cost;
                const totalCommission = quantity * commissionPerFardo;
                const totalTax = quantity * taxPerFardo;
                const totalFixedFee = quantity * fixedFee;
                const totalPlatformCost = totalCommission + totalTax + totalFixedFee;
                const totalOperationCost = totalSandCost + totalPlatformCost;
                const totalGrossProfit = totalRevenue - totalSandCost;
                const totalNetProfit = totalRevenue - totalSandCost - totalPlatformCost;
                const profitMargin = (totalNetProfit / totalRevenue) * 100;
                
                // Atualizar a interface
                updateUI(
                    cost,
                    price,
                    commissionPerFardo,
                    taxPerFardo,
                    fixedFee,
                    platformCostPerFardo,
                    grossProfitPerFardo,
                    netProfitPerFardo,
                    quantity,
                    totalSandCost,
                    totalPlatformCost,
                    totalOperationCost,
                    totalRevenue,
                    totalGrossProfit,
                    totalNetProfit,
                    profitMargin
                );
            }
            
            function updateUI(
                costPerFardo,
                pricePerFardo,
                commissionPerFardo,
                taxPerFardo,
                fixedFeePerFardo,
                platformCostPerFardo,
                grossProfitPerFardo,
                netProfitPerFardo,
                quantity,
                totalSandCost,
                totalPlatformCost,
                totalOperationCost,
                totalRevenue,
                totalGrossProfit,
                totalNetProfit,
                profitMargin
            ) {
                // Formatar valores em reais
                const formatBRL = (value) => {
                    return value.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                };
                
                // Formatar números
                const formatNumber = (value) => {
                    return value.toLocaleString('pt-BR');
                };
                
                // Formatar porcentagem
                const formatPercent = (value) => {
                    return value.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }) + '%';
                };
                
                // Atualizar valores por fardo
                document.getElementById('cost-per-fardo').textContent = formatBRL(costPerFardo);
                document.getElementById('price-per-fardo').textContent = formatBRL(pricePerFardo);
                document.getElementById('commission-per-fardo').textContent = formatBRL(commissionPerFardo);
                document.getElementById('tax-per-fardo').textContent = formatBRL(taxPerFardo);
                document.getElementById('fixed-fee-per-fardo').textContent = formatBRL(fixedFeePerFardo);
                document.getElementById('platform-cost-per-fardo').textContent = formatBRL(platformCostPerFardo);
                document.getElementById('gross-profit-per-fardo').textContent = formatBRL(grossProfitPerFardo);
                document.getElementById('net-profit-per-fardo').textContent = formatBRL(netProfitPerFardo);
                
                // Atualizar detalhes da tabela por fardo
                document.getElementById('detail-cost-per-fardo').textContent = formatBRL(costPerFardo);
                document.getElementById('detail-commission-per-fardo').textContent = formatBRL(commissionPerFardo);
                document.getElementById('detail-tax-per-fardo').textContent = formatBRL(taxPerFardo);
                document.getElementById('detail-fixed-fee-per-fardo').textContent = formatBRL(fixedFeePerFardo);
                document.getElementById('detail-platform-cost-per-fardo').textContent = formatBRL(platformCostPerFardo);
                document.getElementById('detail-price-per-fardo').textContent = formatBRL(pricePerFardo);
                document.getElementById('detail-gross-profit-per-fardo').textContent = formatBRL(grossProfitPerFardo);
                document.getElementById('detail-net-profit-per-fardo').textContent = formatBRL(netProfitPerFardo);
                
                // Atualizar resultados financeiros
                document.getElementById('quantity-display').textContent = formatNumber(quantity);
                document.getElementById('total-sand-cost').textContent = formatBRL(totalSandCost);
                document.getElementById('total-platform-cost').textContent = formatBRL(totalPlatformCost);
                document.getElementById('total-operation-cost').textContent = formatBRL(totalOperationCost);
                document.getElementById('total-revenue').textContent = formatBRL(totalRevenue);
                document.getElementById('total-gross-profit').textContent = formatBRL(totalGrossProfit);
                document.getElementById('total-net-profit').textContent = formatBRL(totalNetProfit);
                document.getElementById('profit-margin').textContent = formatPercent(profitMargin);
                
                // Aplicar cores de lucro/negativo
                applyProfitColors();
            }
            
            function applyProfitColors() {
                const profitElements = document.querySelectorAll('.profit-positive');
                profitElements.forEach(el => {
                    const valueText = el.textContent.replace('R$', '').replace('.', '').replace(',', '.');
                    const value = parseFloat(valueText);
                    if (value < 0) {
                        el.classList.remove('profit-positive');
                        el.classList.add('profit-negative');
                    } else {
                        el.classList.remove('profit-negative');
                        el.classList.add('profit-positive');
                    }
                });
            }
        });