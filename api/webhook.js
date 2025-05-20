export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const payload = req.body;

    // 🔒 Validação opcional de chave/assinatura
    // Exemplo: const receivedSignature = req.headers['x-signature'];

    // 💾 Log (para debug)
    console.log("📬 Webhook recebido do EfiBank:", payload);

    // 🔁 Enviar para seu WooCommerce (opcional)
    const FORWARD_URL = "https://seudominio.com/wp-json/custom-api/pix-webhook"; // Edite aqui
    const response = await fetch(FORWARD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer SUA_CHAVE_SECRETA", // se necessário
      },
      body: JSON.stringify(payload),
    });

    const forwardResult = await response.text();
    console.log("➡️ Reencaminhado para WooCommerce:", forwardResult);

    return res.status(200).json({ message: "Webhook processado com sucesso" });

  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
