import logging
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# Configurar o logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# URL do seu jogo
GAME_URL = "https://github.com/jeff-prog/army_coin"

# Comando /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Bem-vindo ao jogo! Clique aqui para jogar: " + GAME_URL)

# Função principal para iniciar o bot
async def main() -> None:
    application = ApplicationBuilder().token("7334016790:AAH_ZJCw3zr3qlRiEQCwAlWDNyZKorcAPXQ").build()

    application.add_handler(CommandHandler("start", start))

    await application.run_polling()

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
