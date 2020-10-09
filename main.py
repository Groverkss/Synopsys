from discord.ext import commands
from os import environ
from pathlib import Path


def main():
    token = environ.get("BOT_TOKEN")
    if not token:
        print("NO TOKEN")
        return

    prefix = environ.get("BOT_PREFIX")
    if not prefix:
        print("NO PREFIX")
        return

    bot = commands.Bot(command_prefix=commands.when_mentioned_or(prefix))

    def no_dm_check(ctx):
        if ctx.guild is None:
            raise commands.NoPrivateMEssage(
                "I refuse to take part in private conversations."
            )

        return True

    # Add cogs
    cogs = [file.stem for file in Path("cogs").glob("*py")]
    for extension in cogs:
        bot.load_extension(f"cogs.{extension}")

    # Restrict bot usage to inside guild channels only.
    bot.add_check(no_dm_check)

    bot.run(token)


if __name__ == "__main__":
    main()
