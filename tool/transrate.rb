# encoding: utf-8
require 'json'
ROOT     = File.expand_path(File.join(File.dirname(__FILE__), '..'))
src_dir  = "#{ROOT}/tool/resource"
dist_dir = "#{ROOT}/data"

# keys
SCENE      = "---scene-"
QUESTION   = "----question"
SELECT     = "----select"
ANSWER     = "----answer"
COMMENT    = "----comment"
BACKGROUND = "----bg"
CHARACTER  = "----chara"

SCENE_TYPE_NORMAL   = 0
SCENE_TYPE_QUESTION = 1


# return chunk = {scene_id => [line,....]}
def split_scene(str)
  line_list = str.split("\n").map{|s| s.strip}
  chunk = {}
  before_key = ""
  line_list.each do |line|
    if line =~ /^#{SCENE}.*/
      before_key = line.gsub(/#{SCENE}/, '')
      chunk[before_key] = []
    else
      chunk[before_key] << line unless line == ""
    end
  end
  chunk
end

def separate_scene_info(scene_info)
  ret = {
    "type"     => "",
    "serif"    => [],
    "question" => [],
    "select"   => {},
    "answer"   => "",
    "comment"  => [],
    "background" => "",
    "character"  => "",
  }
  before_key = "serif"
  scene_info.each_with_index do |line, i|
    if line =~ /^#{QUESTION}/
      before_key = "question"
    elsif line =~ /^#{ANSWER}/
      before_key = "answer"
    elsif line =~ /^#{SELECT}/
      before_key = "select"
    elsif line =~ /^#{COMMENT}/
      before_key = "comment"
    elsif line =~ /^#{BACKGROUND}/
      before_key = "background"
    elsif line =~ /^#{CHARACTER}/
      before_key = "character"
    else
      case before_key
      when "serif", "question", "comment"
        tmp = line.gsub('　', '')
        ret[before_key] << tmp
      when "select"
        key, value = line.split(" ")
        ret[before_key][key] = value
      when "answer", "character", "background"
        ret[before_key] = line
      else
        puts "error"
      end
    end
  end

  type = SCENE_TYPE_NORMAL
  unless ret["question"].empty?
    type = SCENE_TYPE_QUESTION
  end
  ret["type"] = type
#  p ret
  ret
end

file_list = [
  "#{src_dir}/game_data_20150110/transed_stage1.txt",
  "#{src_dir}/game_data_20150110/transed_stage2.txt",
  "#{src_dir}/game_data_20150110/transed_stage3.txt",
  "#{src_dir}/game_data_20150110/transed_stage4.txt"
]

file_list.each do |file|
  src = File.open(file, "r:UTF-8"){|f| f.read}

  ret = {}
  scene_list = split_scene(src)
  scene_list.each do |id, info|
    ret[id] = separate_scene_info(info)
  end

  output_name =  File.basename(file).gsub('transed_', '').gsub('.txt', '')

  File.write("#{dist_dir}/#{output_name}.json", JSON.generate(ret))
  File.write("#{dist_dir}/#{output_name}.json_prety", JSON.pretty_generate(ret))
end
