import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

class Firestore:
    def __init__(self):
        cred = credentials.Certificate("firestore/secret.json")
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def record_conversation(self, summary, keywords, messagelist):
        record_ref = self.db.collection(u"records").document()

        record = {
            u"datetime": messagelist[0]["datetime"],
            u"keywords": keywords,
            u"summary": summary,
        }

        record_ref.set(record)        

        for message in messagelist:
            message_ref = self.db.collection(u"messages").document()
            message[u"record"] = f'/records/{record_ref.id}'
            message_ref.set(message)
