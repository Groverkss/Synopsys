from discord.ext import commands


class Utilities(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(brief="Delete a conversation")
    async def delete(self, ctx, start=None, end=None):
        """Command to delete conversation"""
        if ctx.message.author.bot:
            return

        if not start or not end:
            await ctx.send(
                "Insufficient arguments!\n Arguements: <start ID> <end ID>"
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

        for message in raw_messages:
            await message.delete()


def setup(bot):
    bot.add_cog(Utilities(bot))
