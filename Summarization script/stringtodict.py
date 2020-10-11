from pprint import pprint

def ListFromString(filename="sampleinput.txt"):
    file = open(filename, "r")
    file_string = file.read()
    each_text = file_string.split('\n')
    output_list = []
    each_text.pop()
    for all_fields in each_text:
        text_dict = {}
        split_fields = all_fields.split('\t')
        if len(split_fields) >= 4:
            text_dict['content'] = split_fields[0]
            text_dict['date'] = split_fields[1]
            text_dict['author'] = split_fields[2]
            text_dict['reactions'] = split_fields[3]
            output_list.append(text_dict)
    return output_list
