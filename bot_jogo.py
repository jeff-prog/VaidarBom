from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackContext

async def start(update: Update, context: CallbackContext) -> None:
    keyboard = [
        [
            InlineKeyboardButton(
                "Jogar", web_app=WebAppInfo(url="https://army-coin-phyh.vercel.app/")  # Coloque aqui o link do seu jogo
            )
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Clique abaixo para jogar:", reply_markup=reply_markup)

if __name__ == '__main__':
    application = ApplicationBuilder().token("7334016790:AAH_ZJCw3zr3qlRiEQCwAlWDNyZKorcAPXQ").build()
    application.add_handler(CommandHandler("start", start))
    application.run_polling()
