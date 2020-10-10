from discord.ext import commands
from json import dump, load


class Record(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(brief="Ping Pong")
    async def ping(self, ctx):
        """Command to test if bot is recieving requests"""
        await ctx.send("Pong")

    @commands.command(brief="Records conversation between two timestamps")
    async def record(self, ctx, start=None, end=None):
        """Command to record conversation"""

        if ctx.message.author.bot:
            return

        if not start or not end:
            await ctx.send(
                "Insufficient arguments!\n USAGE: .record <start ID> <end ID>"
            )
            return

        channel = ctx.channel
        try:
            start_message = await channel.fetch_message(start)
            end_message = await channel.fetch_message(end)
        except:
            await ctx.send("Can not fetch message!")
            return

        try:
            raw_messages = await channel.history(
                before=end_message.created_at,
                after=start_message.created_at,
                oldest_first=True,
            ).flatten()
        except:
            await ctx.send("Can not get messages in that time range!")
            return

        raw_messages = [start_message, *raw_messages, end_message]
        clean_messages = [
            {
                "content": message.clean_content,
                "datetime": message.created_at,
                "author": message.author.display_name,
                "reaction": sum(
                    reaction.count for reaction in message.reactions
                ),
            }
            for message in raw_messages
            if message.clean_content
        ]

        await ctx.send("Done.")

        # for message in clean_messages:
        #     for values in message.values():
        #         print(values, end="\t")
        #     print()

        return


def setup(bot):
    bot.add_cog(Record(bot))
