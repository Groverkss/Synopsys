from discord.ext import commands
from json import dump, load
from pprint import pprint

from summarisation.text_summarisation import generate_summary, generate_keywords

async def convert_to_summary(ctx, start, end):
    """Returns (summary, keywords) from a start and end message"""
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
            "reaction": sum(reaction.count for reaction in message.reactions),
        }
        for message in raw_messages
        if message.clean_content
    ]

    summary = generate_summary(clean_messages)
    keywords = generate_keywords(clean_messages)

    return summary, keywords


class Record(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(brief="Ping Pong")
    async def ping(self, ctx):
        """Command to test if bot is recieving requests"""
        await ctx.send("Pong")

    @commands.command(brief="Summarises a conversation between two timestamps")
    async def summarise(self, ctx, start=None, end=None):
        """Command to summarise conversation"""
        if ctx.message.author.bot:
            return

        if not start or not end:
            await ctx.send(
                "Insufficient arguments!\n Arguements: <start ID> <end ID>"
            )
            return

        summary, keywords = await convert_to_summary(ctx, start, end)

        if summary:
            summary = '```\n' + summary + '```'
            await ctx.send(summary)
        else:
            await ctx.send("```Not enough messages to generate summary```")

        if keywords:
            keyword_str = "Keywords: "
            for word in keywords:
                keyword_str += f"{word}, "

            keyword_str = '```\n' + keyword_str +  '```'
            await ctx.send(keyword_str)
        else:
            await ctx.send("```Not enough messages to generate keywords```")

    @commands.command(brief="Records a conversation between two timestamps")
    async def record(self, ctx, start=None, end=None):
        """Command to summarise conversation"""
        if ctx.message.author.bot:
            return

        if not start or not end:
            await ctx.send(
                "Insufficient arguments!\n Arguements: <start ID> <end ID>"
            )
            return

        summary, keywords = convert_to_summary(ctx, start, end)


def setup(bot):
    bot.add_cog(Record(bot))
